/*
 * @Author: yangyongqian
 * @Date: 2023-03-25 20:26:02
 * @Description:node+mysql
 */
// 引入mysql
const mysql = require('mysql');
// 创建连接池
const pool = mysql.createPool({
  host:'127.0.0.1',
  database:'yyqnode',
  user:'root',
  password:'root',
  port:'3306'
})
// 封装sql方法 回调函数封装
// const query = (sql,params,cb)=>{
//   pool.getConnection((err,conn)=>{
//     if(err){
//       console.log('连接数据库失败');
//     }
//     conn.query(sql,params,(error, results, fields)=>{
//       if(error){
//         console.log('sql查询失败');
//         // 释放连接
//         conn.release();
//       }
//       cb(results,fields)
//     })
//   })
// }

// promise封装
const query = (sql,params)=>{
  return new Promise((resolve,reject) =>{
    pool.getConnection((err,connection)=>{
      if (err){
        reject(err)
        connection.release();
      } else {
        connection.query(sql,params,(err,result)=>{
          connection.release();
          if (err){
            reject(err)
          } else {
            resolve(result)
          }
        })
      }
    })
  })
}

let sql = 'select * from users';
let params = []
// query(sql,params,(results)=>{
//   console.log('查询结果',results);
// })

const getUserData = async()=>{
  let data = await query(sql,[]);
  console.log('data=',data);
}
getUserData();
