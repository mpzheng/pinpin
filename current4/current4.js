const app = getApp()
Page({
  data: {
    hasPinDan:false,
    _id:'',
    beginName: '',
    aimName: '',
    beginTime: [
      {
        date: '',
        time: ''
      }
    ],
    waitTime: '',
    countPeople:'',
    unionPlace:'',
  },
  bindJumpToCreate:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function (options) {
    console.log(options._id)
    this.setData({
      hasPinDan: app.globalData.hasPinDan
    })
    var that = this
    const db = wx.cloud.database()
    db.collection('order').doc(options._id).get({
      success: function (res) {
        that.setData({
          beginName: res.data.beginName,
          aimName: res.data.aimName,
          beginTime: res.data.beginTime,
          waitTime: res.data.waitTime,
          countPeople: res.data.countPeople,
          unionPlace: res.data.unionPlace
        })

      }
    })

    
  },
  bindPinFriend: function () {
    wx.navigateTo({
      url: '../pinFriend/pinFriend',
    })
  },

  bindJumpToIndex: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})