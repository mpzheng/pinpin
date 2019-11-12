Page({
  data: {
    beginName: '福州大学',
    aimName: '',
    beginTime: [
      {
        date: '',
        time: ''
      }
    ],
    countPeople:1,
    waitTime: '00:30'
  },

  onLoad: function (option) {
    var that = this
    that.setData({
      aimName:option.aimName
    })
  },

  bindDateChange: function (e) {
    let str = 'beginTime.date'
    this.setData({
      [str]: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    let str = 'beginTime.time'
    this.setData({
      [str]: e.detail.value
    })
  },

  bindWaitTimeChange: function (e) {
    this.setData({
      waitTime: e.detail.value
    })
  },

  bindCorrect: function () {
    wx.setStorage({
      key: "list",
      data: this.data
    })
    const db = wx.cloud.database()
    db.collection('order').add({
      // data 字段表示需新增的 JSON 数据
      data: this.data,
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      }
    })
    wx.navigateTo({
      url: '../current4/current4'
    })
  }
})