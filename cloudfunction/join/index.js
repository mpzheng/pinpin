// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('todos').where({
      done: false
    })
      .update({
        data: {
          passenger2: {
            name: 'Bili',
            sdept: '人文学院',
            tel: '13616071298',
            sex: '男'
          }
        },
      })
  } catch (e) {
    console.error(e)
  }
}