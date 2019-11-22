// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  return await db.collection('order').where({
    location: _.geoNear({
      geometry: db.Geo.Point(Number(event.lng), Number(event.lat)),
      maxDistance: 5000
    })
  }).get()
}