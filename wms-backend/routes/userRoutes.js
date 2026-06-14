const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');

import express from 'express'
import { pool } from '../db.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

// 📌 목록 조회 (검색조건 포함)
router.get('/users', async (req, res) => {
  try {
    const { userName, deptCode, useYn } = req.query;
    
    let sql = `
      SELECT USER_SEQ, USER_ID, USER_NAME, DEPT_CODE, DEPT_NAME, 
             ROLE_CODE, EMAIL, PHONE, USE_YN, CREATED_DT
      FROM USERS 
      WHERE DEL_YN = 'N'
    `;
    const params = [];

    if (userName) {
      sql += ` AND USER_NAME LIKE ?`;
      params.push(`%${userName}%`);
    }
    if (deptCode && deptCode !== 'ALL') {
      sql += ` AND DEPT_CODE = ?`;
      params.push(deptCode);
    }
    if (useYn && useYn !== 'ALL') {
      sql += ` AND USE_YN = ?`;
      params.push(useYn);
    }
    sql += ` ORDER BY USER_SEQ DESC`;

    const [rows] = await db.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📌 등록
router.post('/users', async (req, res) => {
  try {
    const { userId, userPwd, userName, deptCode, deptName, roleCode, email, phone, useYn } = req.body;
    
    // 중복 체크
    const [exists] = await db.query('SELECT USER_SEQ FROM USERS WHERE USER_ID = ? AND DEL_YN = "N"', [userId]);
    if (exists.length > 0) {
      return res.status(400).json({ success: false, message: '이미 사용 중인 아이디입니다.' });
    }

    // 비밀번호 암호화
    const hashedPwd = await bcrypt.hash(userPwd, 10);

    const sql = `
      INSERT INTO USERS (USER_ID, USER_PWD, USER_NAME, DEPT_CODE, DEPT_NAME, 
                        ROLE_CODE, EMAIL, PHONE, USE_YN, CREATED_BY)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      userId, hashedPwd, userName, deptCode, deptName, 
      roleCode, email, phone, useYn || 'Y', req.user?.userId || 'system'
    ]);

    res.json({ success: true, data: { userSeq: result.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📌 수정
router.put('/users/:userSeq', async (req, res) => {
  try {
    const { userSeq } = req.params;
    const { userName, deptCode, deptName, roleCode, email, phone, useYn, userPwd } = req.body;
    
    let sql = `
      UPDATE USERS 
      SET USER_NAME = ?, DEPT_CODE = ?, DEPT_NAME = ?, ROLE_CODE = ?, 
          EMAIL = ?, PHONE = ?, USE_YN = ?, UPDATED_BY = ?
    `;
    const params = [userName, deptCode, deptName, roleCode, email, phone, useYn, req.user?.userId || 'system'];

    // 비밀번호가 입력된 경우만 변경
    if (userPwd) {
      const hashedPwd = await bcrypt.hash(userPwd, 10);
      sql += `, USER_PWD = ?`;
      params.push(hashedPwd);
    }

    sql += ` WHERE USER_SEQ = ?`;
    params.push(userSeq);

    await db.query(sql, params);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📌 삭제 (논리삭제)
router.delete('/users/:userSeq', async (req, res) => {
  try {
    const { userSeq } = req.params;
    await db.query(
      `UPDATE USERS SET DEL_YN = 'Y', UPDATED_BY = ? WHERE USER_SEQ = ?`,
      [req.user?.userId || 'system', userSeq]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;