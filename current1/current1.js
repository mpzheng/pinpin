Page({

  data: {
    aimName:'',
    listItem: []//需要加id
  },

  creatNew :function (){
    wx.navigateTo({
      url: '../current2/current2?aimName=' + this.data.aimName
    })
  },

  bindJoinTo:function(e){
    wx.navigateTo({
      url: '../joinTo/joinTo'
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