Page({

  data: {
    expectSex:'不限',
    expectCount: 4,
    expectApp: '不限',
    sexArray:['不限','男','女'],
    countArray: [2,3,4],
    appArray: ['不限', '滴滴打车', '滴答出行']
  },

  onLoad: function (options) {

  },

  bindSexChange: function (e) {
    this.setData({
      expectSex: this.data.sexArray[e.detail.value]
    })
  },
  bindCountChange: function (e) {
    this.setData({
      expectCount: this.data.countArray[e.detail.value]
    })
  },
  bindAppChange: function (e) {
    this.setData({
      expectApp: this.data.appArray[e.detail.value]
    })
  },
  bindCorrect:function(e){
    wx.navigateBack({
      
    })
  }
})