import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser' // ← 추가
import authRouter from './routes/auth.js'
import dashRouter from './routes/dashboard.js'
import productRouter from './routes/products.js'

dotenv.config()
const app = express()

// ★ 핵심: credentials true
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser()) // ← 추가

app.use('/api/auth',      authRouter)
app.use('/api/dashboard', dashRouter)
app.use('/api/products',  productRouter)


app.listen(process.env.PORT, ()=>console.log('API ::: http://localhost:3001'))