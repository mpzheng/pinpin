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

    const db = wx.cloud.database()
    db.collection('user').add({
      data:{
        name: 'Van',
        sdept: '人文学院',
        tel: '13616071248',
        sex: '男',
        now_id:'',
        history_id:[]
      },
      success: function (res) {
        console.log(res)
      },
    })
  
    
    wx.getSetting({//获取头像名称
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    hasPinDan:null,
    hasSignIn:null
  }
})
