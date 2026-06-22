// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',   // HTTPS에서는 true
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 8 * 60 * 60 * 1000,
  path: '/'
};

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('wms_token', token, cookieOpts);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그아웃
router.post('/logout', (req, res) => {
  res.clearCookie('wms_token', { path: '/' });
  res.json({ ok: true });
});

// 현재 사용자 정보
router.get('/me', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, name, role, email FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('ME Error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;