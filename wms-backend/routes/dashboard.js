import express from 'express'
import { pool } from '../db.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

router.get('/', verifyToken, async (req,res)=>{
  const [[inSum]] = await pool.query('SELECT COALESCE(SUM(qty),0) as s FROM inbound')
  const [[outSum]] = await pool.query('SELECT COALESCE(SUM(qty),0) as s FROM outbound')
  const [[stock]] = await pool.query('SELECT COALESCE(SUM(qty),0) as s FROM inventory')
  
  // 최근 7일 입출고
  const [in7] = await pool.query(`SELECT DATE(created_at) d, SUM(qty) v FROM inbound WHERE created_at >= CURDATE()-INTERVAL 6 DAY GROUP BY d`)
  const [out7] = await pool.query(`SELECT DATE(created_at) d, SUM(qty) v FROM outbound WHERE created_at >= CURDATE()-INTERVAL 6 DAY GROUP BY d`)
  
  // 창고별
  const [byLoc] = await pool.query(`SELECT location as name, SUM(qty) as v FROM inventory GROUP BY location`)
  
  // TOP5
  const [top5] = await pool.query(`
    SELECT p.code, p.name, IFNULL(i.qty,0) as stock,
    (SELECT SUM(qty) FROM inbound WHERE product_id=p.id) as inQty,
    (SELECT SUM(qty) FROM outbound WHERE product_id=p.id) as outQty
    FROM products p LEFT JOIN inventory i ON p.id=i.product_id ORDER BY inQty DESC LIMIT 5`)
  
  const [logs] = await pool.query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 5')
  const [low] = await pool.query('SELECT p.name, i.qty, p.safety_stock FROM inventory i JOIN products p ON i.product_id=p.id WHERE i.qty < p.safety_stock LIMIT 1')
  
  res.json({
    summary:{ totalIn:inSum.s, totalOut:outSum.s, stock:stock.s, accuracy:99.2 },
    chart7:{in:in7, out:out7},
    pie:byLoc,
    top5, logs, alert:low[0]||null
  })
})
export default router