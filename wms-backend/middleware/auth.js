import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
  const token = req.cookies.wms_token // ← localStorage → 쿠키
  if(!token) return res.status(401).json({message:'로그인 필요'})
  
  try{ 
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next() 
  }
  catch{ 
    res.status(403).json({message:'토큰 만료'}) 
  }
}