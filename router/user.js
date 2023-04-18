/*
 * @Author: yangyongqian
 * @Date: 2023-03-26 12:54:17
 * @Description:用户管理
 */
const express = require('express')
const router = express.Router();

// 注册
router.post('/reg',require('../controller/user').register);
router.post('/login',require('../controller/user').login);


module.exports = router;
