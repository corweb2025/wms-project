import express from 'express'
import { pool } from '../db.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

// --- 창고 ---
router.get('/warehouses', verifyToken, async (_,res)=>{ const [r]=await pool.query('SELECT * FROM warehouses ORDER BY id'); res.json(r) })
router.post('/warehouses', verifyToken, async (req,res)=>{ const {name,code,type}=req.body; await pool.query('INSERT INTO warehouses (name,code,type) VALUES (?,?,?)',[name,code,type]); res.json({ok:true}) })
router.put('/warehouses/:id', verifyToken, async (req,res)=>{ const {name,code,type}=req.body; await pool.query('UPDATE warehouses SET name=?,code=?,type=? WHERE id=?',[name,code,type,req.params.id]); res.json({ok:true}) })
router.delete('/warehouses/:id', verifyToken, async (req,res)=>{ await pool.query('DELETE FROM warehouses WHERE id=?',[req.params.id]); res.json({ok:true}) })

// --- Zone ---
router.get('/zones', verifyToken, async (req,res)=>{ const [r]=await pool.query(`SELECT z.*, (SELECT COUNT(*) FROM locations l WHERE l.zone_id=z.id) as loc_count FROM zones z WHERE warehouse_id=?`,[req.query.warehouse_id]); res.json(r) })
router.post('/zones', verifyToken, async (req,res)=>{ const {warehouse_id,code,name}=req.body; await pool.query('INSERT INTO zones (warehouse_id,code,name) VALUES (?,?,?)',[warehouse_id,code,name]); res.json({ok:true}) })
router.put('/zones/:id', verifyToken, async (req,res)=>{ const {code,name}=req.body; await pool.query('UPDATE zones SET code=?,name=? WHERE id=?',[code,name,req.params.id]); res.json({ok:true}) })
router.delete('/zones/:id', verifyToken, async (req,res)=>{ await pool.query('DELETE FROM zones WHERE id=?',[req.params.id]); res.json({ok:true}) })

// --- Location ---
router.get('/locations', verifyToken, async (req,res)=>{ const [r]=await pool.query('SELECT * FROM locations WHERE zone_id=? ORDER BY code',[req.query.zone_id]); res.json(r) })
router.post('/locations', verifyToken, async (req,res)=>{ 
  console.log('요청 body1 : ', req.body);
  const {zone_id,code,capacity}=req.body; 
  await pool.query('INSERT INTO locations (zone_id,code,capacity,used) VALUES (?,?,?,0)',[zone_id,code,capacity||1000]); res.json({ok:true}) 
})
router.post('/locations2', verifyToken, async (req,res)=>{ 
  console.log('요청 body2 : ', req.body);
  const {zone_id,code,capacity}=req.body; 
  await pool.query('INSERT INTO locations (zone_id,code,capacity,used) VALUES (?,?,?,0)',[zone_id,code,capacity||3000]); 
  res.json({ok:true}); 
})
router.put('/locations/:id', verifyToken, async (req,res)=>{ const {code,capacity}=req.body; await pool.query('UPDATE locations SET code=?,capacity=? WHERE id=?',[code,capacity,req.params.id]); res.json({ok:true}) })
router.delete('/locations/:id', verifyToken, async (req,res)=>{ await pool.query('DELETE FROM locations WHERE id=?',[req.params.id]); res.json({ok:true}) })

export default router