/*
 * @Author: yangyongqian
 * @Date: 2023-03-26 20:39:22
 * @Description:购物车控制器
 */
const express = require('express')
const router = express.Router()
const {
  addCart,
  deleteCart,
  getCartByUser,
  modifyCart,
  giveMoney
} = require('../controller/cart')
const jwt = require('jwt-simple')
const config = require('../config')

// 统一拦截 必须登录才能使用以下接口
router.use((req, res, next) => {
  // 判断前端是否携带token
  if (req.headers.token) {
    let token = jwt.decode(req.headers.token, config.tokenKey)
    // 存储token
    req.userInfo = token
    next()
  } else {
    res.json({
      code: 301,
      msg: '请先登录或登录已过期'
    })
  }
})

router.post('/add', addCart)
router.post('/delete', deleteCart)
router.post('/getCart', getCartByUser)
router.post('/modify', modifyCart)
router.post('/giveMoney', giveMoney)

module.exports = router
