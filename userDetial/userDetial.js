const app = getApp()
Page({
  data: {
    userInfo:null
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)
  }
})