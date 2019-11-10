Page({

  data: {
    aimName:'',
    listItem: [
      {
        beginTime:'15:50',
        aimName:'爱情海',
        countPeople:'1'
      },
      {
        beginTime: '11:50',
        aimName: '福州大学',
        countPeople: '2'
      },
      {
        beginTime: '23:50',
        aimName: '汽车北站',
        countPeople: '3'
      },
      {
        beginTime: '10:00',
        aimName: '福州大学',
        countPeople: '1'
      }
    ]
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