const app = getApp()

Page({
  data: {
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
    countPeople: ''
  },

  onLoad: function (options) {
    var that = this

    that.setData({
      _id: options._id,
    })
    const db = wx.cloud.database()
    db.collection('order').doc(options._id).get({
      success: function (res) {
        that.setData({
          beginName: res.data.beginName,
          aimName: res.data.aimName,
          beginTime: res.data.beginTime,
          waitTime: res.data.waitTime,
          countPeople:res.data.countPeople
        })
        
      }
    })

    
  },


  bindCorrect:function(){
    app.globalData.hasPinDan = true

    wx.cloud.callFunction({
      name: 'getInfo',
    }).then(res => {
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'join',
        // 传递给云函数的event参数
        data: {
          id:this.data._id,
          person:{
            name: res.result.data[0].name,
            sdept: res.result.data[0].sdept,
            tel: res.result.data[0].tel,
            sex: res.result.data[0].sex
          }
        }
      }).then(res => {
        // output: res.result === 3
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'setInfo',
          // 传递给云函数的event参数
          data: {
            id: this.data._id
          }
        }).then(res => {
          // output: res.result === 3
          wx.navigateTo({
            url: '../current4/current4'
          })
        }).catch(err => {
          // handle error
          console.log("error1")
        })

      }).catch(err => {
        // handle error
        console.log("error2")
      })
    }).catch(err => {
    })
    
  },

  

  bindPinFriend:function(){
    wx.navigateTo({
      url: '../pinFriend/pinFriend?_id='+this.data._id,
    })
  }
})