/*
 * @Author: yangyongqian
 * @Date: 2023-04-10 16:59:53
 * @Description:商品接口逻辑
 */
const fs = require('fs') // 文件系统模块
class GoodsController {
  async getGoodById(req, res, next) {
    const { id } = req.query
    const listStr = fs.readFileSync('public/data/list.json').toString()
    const result = JSON.parse(listStr).find((t) => t.id === parseInt(id))
    res.json(result)
  }
}

module.exports = new GoodsController()
