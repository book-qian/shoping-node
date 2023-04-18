/*
 * @Author: yangyongqian
 * @Date: 2023-03-25 23:00:24
 * @Description:
 */
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
// 引入中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/user', require('./router/user'))
app.use('/cart', require('./router/carts'))
app.use('/good', require('./router/good'))

// 静态资源服务器
app.use(express.static('./public'))

app.listen('8080', () => {
  const url = 'http://127.0.0.1:8080'
  console.log(`服务启动成功${url}`)
})
