/*
 * @Author: yangyongqian
 * @Date: 2023-03-26 12:54:26
 * @Description:用户业务逻辑
 */
const db = require('../core/mysql')
const { tokenKey } = require('../config/index')
const jwt = require('jwt-simple')
const moment = require('moment')

class UserControll {
  // 注册
  async register(req, res, next) {
    const insertSql =
      'INSERT INTO users (u_name,u_pwd,u_sex,u_create) VALUES(?,?,?,?) ; '
    const { name, pwd, sex = '男' } = req.body
    const params = [name, pwd, sex, moment().format('YY-MM-DD HH-mm-ss')]

    try {
      const result = await db.query(insertSql, params)
      if (result && result.affectedRows >= 1) {
        res.json({
          code: 200,
          msg: '注册成功'
        })
      } else {
        res.json({
          code: 200,
          msg: '注册失败'
        })
      }
    } catch (error) {
      res.json({
        code: 500,
        msg: '服务器错误',
        error
      })
    }
  }
  // 登录
  async login(req, res, next) {
    const selectSql = 'SELECT * FROM users WHERE u_name=? AND u_pwd=? ; '
    const { name, pwd } = req.body
    const params = [name, pwd]
    // 生成token
    function createToken(data) {
      return jwt.encode(
        {
          exp: Date.now() + 1000 * 60 * 60 * 24,
          info: data
        },
        tokenKey
      )
    }
    try {
      const result = await db.query(selectSql, params)
      if (result && result.length >= 1) {
        res.json({
          code: 200,
          msg: '登录成功',
          data: result[0],
          token: createToken(result[0])
        })
      } else {
        res.json({
          code: 201,
          msg: '请先注册账号'
        })
      }
    } catch (error) {
      res.json({
        code: 500,
        msg: '服务器错误'
      })
    }
  }
}

module.exports = new UserControll()
