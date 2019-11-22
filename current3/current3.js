const app = getApp()

Page({
  data: {
    beginName: '福州大学',
    aimName: '',
    lng:0,
    lat:0,
    beginTime: [
      {
        date: '',
        time: ''
      }
    ],
    countPeople:1,
    waitTime: '00:30',
    unionPlace:'三区门口',
    passenger:[
      {
        name: 'Van',
        sdept: '人文学院',
        tel: '13616071248',
        sex: '男'
      }
    ],
  },

  onLoad: function (option) {
    var that = this
    that.setData({
      aimName:option.aimName
    })
  },
  getUnionPlace:function(e){
    this.setData({
      unionPlace: e.detail.value
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
    app.globalData.hasPinDan = true
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoding/v3/', //仅为示例，并非真实的接口地址
      data: {
        'address': this.data.aimName,
        'output': 'json',
        'ak': 'LnINGNrNo234p9Kiv4pvMLzQiFlrvPls',
        'city': '福州市'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          lng: res.data.result.location.lng,
          lat: res.data.result.location.lat
        })
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'create',
          // 传递给云函数的event参数
          data: that.data
        }).then(res => {
          // output: res.result === 3
          console.log(res.result._id)
          wx.navigateTo({
            url: '../current4/current4?_id=' + res.result._id
          })
        }).catch(err => {
          // handle error
          console.log("error")
        })
        console.log(res.data.result.location.lng)
      }
    })

    
    
  }
})