App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: '',
        traceUser: true,
      })
    }

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log('成功' + res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
