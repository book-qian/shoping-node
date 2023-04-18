/*
 * @Author: yangyongqian
 * @Date: 2023-04-10 16:56:09
 * @Description:商品路由
 */
const express = require('express')
const router = express.Router()

router.get('/getGood', require('../controller/good').getGoodById)

module.exports = router
