Page({

  data: {
    aimName:'',
    listItem: []
  },

  creatNew :function (){
    wx.navigateTo({
      url: '../current2/current2?aimName=' + this.data.aimName,
    })
  },

  onLoad:function(option){
    var that = this
    const db = wx.cloud.database()
    db.collection('order')
      .field({
        beginTime: true,
        aimName: true,
        countPeople: true,
      })
      .where({
        aimName: option.aimName,
      })
      .get()
      .then(res => {
        that.setData({
          aimName: option.aimName,
          listItem:res.data
         })
      })
      .catch(err => {
        console.error(err)
      })
    
  }
})