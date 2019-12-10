// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('order').doc(event.id)
      .update({
        data: {
          passenger: _.push([event.person]),
          countPeople:_.inc(1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}