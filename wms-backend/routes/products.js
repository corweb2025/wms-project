import express from 'express'
import { pool } from '../db.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

// 상품 목록 (필터 + 재고상태 계산)
router.get('/', verifyToken, async (req,res)=>{
  const {code='', name='', category=''} = req.query
  const [rows] = await pool.query(`
    SELECT p.id, p.code, p.name, p.category, p.spec, p.unit, p.barcode, p.location, p.is_active, p.safety_stock,
           IFNULL(i.qty,0) as stock,
           CASE WHEN IFNULL(i.qty,0) > p.safety_stock THEN '정상'
                WHEN IFNULL(i.qty,0) = p.safety_stock THEN '주의'
                ELSE '부족' END as status
    FROM products p LEFT JOIN inventory i ON p.id=i.product_id
    WHERE p.code LIKE ? AND p.name LIKE ? AND (?='' OR p.category=?)
    ORDER BY p.id DESC LIMIT 100
  `, [`%${code}%`,`%${name}%`, category, category])
  res.json(rows)
})

// 상품 등록
router.post('/', verifyToken, async (req,res)=>{
  const {name, category, unit, spec, safety_stock, location, barcode, is_active} = req.body
  const [max] = await pool.query('SELECT MAX(id) as m FROM products')
  const code = `A-${String((max[0].m||0)+1).padStart(3,'0')}`
  const bc = barcode || `880${Date.now().toString().slice(-10)}`
  await pool.query('INSERT INTO products (code,name,category,spec,unit,safety_stock,location,barcode,is_active) VALUES (?,?,?,?,?,?,?,?,?)',
    [code,name,category,spec,unit,safety_stock,location,bc,is_active?1:0])
  const pid = (await pool.query('SELECT LAST_INSERT_ID() as id'))[0][0].id
  await pool.query('INSERT INTO inventory (product_id, qty, location) VALUES (?,?,?) ON DUPLICATE KEY UPDATE location=?', [pid,0,location,location])
  res.json({ok:true, code, barcode:bc})
})

// 바코드 목록
router.get('/barcodes', verifyToken, async (req,res)=>{
  const [rows] = await pool.query('SELECT code, name, barcode, created_at FROM products WHERE barcode IS NOT NULL')
  res.json(rows)
})
export default router