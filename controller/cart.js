/*
 * @Author: yangyongqian
 * @Date: 2023-03-26 20:39:22
 * @Description:购物车类
 */
const db = require('../core/mysql')
const moment = require('moment')
class CartController {
  // 是否购买过
  static async isBuy(req, res, next) {
    const sql = 'SELECT * FROM carts WHERE u_id=? AND p_id=? ;'
    const { u_id } = req.userInfo.info
    const { p_id } = req.body
    const params = [u_id, p_id]
    try {
      const result = await db.query(sql, params)
      return result && !!result.length
    } catch (err) {
      res.json({
        code: 500,
        msg: '服务器错误',
        err
      })
    }
  }
  // 更新购买过的商品
  static async updateBuyedGoods(req, res) {
    const { u_id } = req.userInfo.info
    const { p_id, p_num } = req.body
    const params = [p_num, u_id, p_id]
    const sql =
      'UPDATE carts SET p_num=p_num + ? ,p_total = p_num * p_price,p_status=1 WHERE u_id = ? AND p_id = ?;'
    try {
      const result = await db.query(sql, params)
      if (result && result.affectedRows >= 1) {
        res.json({
          code: 200,
          msg: '更新商品信息成功'
        })
      } else {
        res.json({
          code: 200,
          msg: '更新商品信息失败'
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
  // 添加购物车
  async addCart(req, res, next) {
    // 1.判断是否购买过
    const isbuy = await CartController.isBuy(req, res) // true购买过 false没有

    if (isbuy) {
      // 3.购买了修改 数量
      // console.log('已经购买过商品了,修改数量')
      CartController.updateBuyedGoods(req, res)
    } else {
      // 2.没有购买插入一条购物车记录
      const sql =
        'INSERT INTO carts(u_id,p_id,p_name,p_img,p_num,p_price,p_total,p_create,p_status) VALUES(?,?,?,?,?,?,?,?,1);'
      const { u_id } = req.userInfo.info
      const { p_id, p_name, p_img, p_num, p_price } = req.body
      const params = [
        u_id,
        p_id,
        p_name,
        p_img,
        p_num,
        p_price,
        p_price * p_num,
        moment().format('YYYY-MM-DD HH-mm-ss')
      ]
      try {
        const result = await db.query(sql, params)
        if (result && result.affectedRows >= 1) {
          res.json({
            code: 200,
            msg: '添加购物车成功'
          })
        } else {
          res.json({
            code: 200,
            msg: '添加购物车失败'
          })
        }
      } catch (error) {
        res.json({
          code: 200,
          msg: '服务器错误',
          error
        })
      }
    }
  }
  // 获取购物车
  async getCartByUser(req, res, next) {
    const sql = 'SELECT * FROM carts WHERE p_status = 1 AND u_id = ?;'
    const { u_id } = req.userInfo.info
    const params = [u_id]
    try {
      const result = await db.query(sql, params)
      res.json({
        code: 200,
        msg: '查询成功',
        data: result
      })
    } catch (error) {
      res.json({
        code: 500,
        msg: '服务器错误',
        error
      })
    }
  }
  // 修改购物车
  async modifyCart(req, res, next) {
    // 前端必传购物车id
    const sql =
      'UPDATE carts SET p_num = ?,p_total = p_num * p_price  WHERE c_id = ? AND u_id = ?;'
    const { u_id } = req.userInfo.info
    const { c_id, p_num } = req.body
    const params = [p_num, c_id, u_id]
    try {
      const result = await db.query(sql, params)
      if (result && result.affectedRows >= 1) {
        res.json({
          code: 200,
          msg: '修改成功'
        })
      } else {
        res.json({
          code: 200,
          msg: '修改失败'
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
  // 删除购物车
  async deleteCart(req, res, next) {
    // 改变状态
    const sql = 'UPDATE carts SET p_status = 2 WHERE c_id = ? AND u_id = ?;'
    const { u_id } = req.userInfo.info
    const { c_id } = req.body
    const params = [c_id, u_id]
    try {
      const result = await db.query(sql, params)
      if (result && result.affectedRows >= 1) {
        res.json({
          code: 200,
          msg: '删除成功'
        })
      } else {
        res.json({
          code: 200,
          msg: '删除失败'
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
  // 结算
  async giveMoney(req, res, next) {}
}

module.exports = new CartController()
