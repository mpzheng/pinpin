// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  return await db.collection('user').where({
    _openid: OPENID
  })
  .update({
    data: {
      history_id: _.push([event.id]),
      now_id: event.id
    },
  })
}