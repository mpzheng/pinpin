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
    //console.log(options._id)
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
    wx.navigateTo({
      url: '../current4/current4?_id=' + this.data._id
    })
    
  },

  

  bindPinFriend:function(){
    wx.navigateTo({
      url: '../pinFriend/pinFriend',
    })
  }
})