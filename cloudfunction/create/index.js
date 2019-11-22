// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('order').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        beginName: event.beginName,
        aimName: event.aimName,
        beginTime: event.beginTime ,
        countPeople: event.countPeople,
        waitTime: event.waitTime,
        unionPlace: event.unionPlace,
        passenger: event.passenger,
        location: db.Geo.Point(event.lng, event.lat)
      }
    })
  } catch (e) {
    console.error(e)
  }
}