Page({
  data: {
    beginName: '',
    aimName: '',
    beginTime: [
      {
        date: '',
        time: ''
      }
    ],
    waitTime: '',
    countPeople:''
  },

  onLoad: function () {
    var that = this
    const db = wx.cloud.database()
    wx.getStorage({
      key: 'list',
      success(res) {
        db.collection('order')
          .doc(res.data.id)
          .field({
            beginName: true,
            aimName: true,
            beginTime: true,
            waitTime: true,
            countPeople:true
          })
          .get()
          .then(res => {
            that.setData({
              beginName:res.data.beginName,
              aimName: res.data.aimName,
              beginTime: res.data.beginTime,
              waitTime: res.data.waitTime,
              countPeople: res.data.countPeople
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    })

    
    
  },

})