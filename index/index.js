const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    tempAim: '',
    aimName: ''
  },
  getAim: function(e) {
    this.setData({
      tempAim: e.detail.value,
      aimName: e.detail.value,
    })
  },
  sendAim: function(e) {
    let text = this.data.aimName
    this.setData({
      tempAim: ''
    });
    wx.navigateTo({
      url: '../current1/current1?aimName=' + this.data.aimName
    })
  },
  JumpToNow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '../current4/current4'
      })
    }, 10) 
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res =>{
          console.log(res)
        }
      })
    }
  }
})
