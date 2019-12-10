const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasSignIn: false,
    tempAim: '',
    aimName: '',
    index: 0,
    deptArray: ['数计学院', '生工学院', '物信学院', '电气学院', '人文学院', '机械学院', '外国语学院', '紫金学院', '化学学院', '石化学院'],
    studentId:'',
    dept:'数计学院',
    tel:''
  },
  getAim: function(e) {
    this.setData({
      tempAim: e.detail.value,
      aimName: e.detail.value
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
  jumpToNow: function () {
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      dept: this.data.deptArray[e.detail.value]
    })
  },
  getStudentId:function(e){
    this.setData({
      studentId: e.detail.value,
    });
  },
  getTel: function (e) {
    this.setData({
      tel: e.detail.value,
    });
  },
  correct:function(){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'setInfo2',
      // 传递给云函数的event参数
      data: {
        name: this.data.studentId,
        sdept: this.data.dept,
        tel: this.data.tel,
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      // handle error
      console.log("error1")
    })
    this.setData({
      hasSignIn: true
    });
    app.globalData.hasSignIn = true
    console.log(app.globalData.hasSignIn)
  },
  onLoad: function () {
    
    //根据openid查询用户是否注册
    //若已经注册
    //若未注册
    console.log(app.globalData.hasSignIn)
    if (app.globalData.hasSignIn) {
      this.setData({
        hasSignIn: true
      });
      console.log(this.data.hasSignIn)
    }

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