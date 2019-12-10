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
    this.setData({
      hasPinDan: app.globalData.hasPinDan
    })
    var that = this
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'getInfo',
    }).then(res => {
      db.collection('order').doc(res.result.data[0].now_id).get({
        success: function (res) {
          that.setData({
            _id: res.data._id,
            beginName: res.data.beginName,
            aimName: res.data.aimName,
            beginTime: res.data.beginTime,
            waitTime: res.data.waitTime,
            countPeople: res.data.countPeople,
            unionPlace: res.data.unionPlace
          })

        }
      })
      }).catch(err => {
        // handle error
        console.log("error")
      })
    

    
  },
  bindPinFriend: function () {
    wx.navigateTo({
      url: '../pinFriend/pinFriend?_id='+this.data._id,
    })
  },

  bindJumpToIndex: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})