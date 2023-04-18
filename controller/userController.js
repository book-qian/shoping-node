/*
 * @Author: yangyongqian
 * @Date: 2023-03-26 10:35:54
 * @Description:用户控制器
 */
const express = require('express');
const db = require('../core/mysql');
const router = express.Router();

router.get('/getScoreList',async (req,res,next)=>{
  const { sex } = req.query;
  const sql = "SELECT  * FROM  student WHERE s_sex=? ;";
  const result = await db.query(sql,[sex]);
  res.json({
    code:200,
    msg:'请求成功',
    data:result
  })
})

// 分页接口查询
router.get('/getStudentList',async (req,res,next)=>{
  const pageSize = parseInt(req.query?.pageSize ?? 5);
  const pageNum = req.query?.pageNum ?? 1 ;
  const sql = "SELECT * FROM student limit ?,? ;";
  const params = [(pageNum - 1)*pageSize,pageSize];
  const result = await db.query(sql,params);

  res.json({
    code:200,
    msg:'请求成功',
    data:result
  })
})

module.exports = router;
