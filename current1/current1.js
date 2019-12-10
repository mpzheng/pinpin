Page({

  data: {
    aimName:'',
    listItem: []
  },

  creatNew :function (){
    wx.navigateTo({
      url: '../current2/current2?aimName=' + this.data.aimName
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

  bindJoinTo:function(e){
    wx.navigateTo({
      url: '../joinTo/joinTo'
    })
  },

  onLoad:function(option){
    var that = this
    that.setData({
      aimName: option.aimName
    })

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
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'find',
          // 传递给云函数的event参数
          data: {
            lng: res.data.result.location.lng,
            lat: res.data.result.location.lat
          }
        }).then(res => {
          that.setData({
            listItem: res.result.data
          })
          // output: res.result === 3
        }).catch(err => {
          // handle error
        })
      }
    })
    

    
    
  }
})