Page({
  data: {
    _id:'',
    listItem:[]
  },

  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    console.log(options._id)
    db.collection('order').doc(options._id).get({
      success: function (res) {
        that.setData({
          listItem: res.data.passenger
        })

      }
    })



  },
  
})
