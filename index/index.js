Page({
  data: {
    tempAim: '',
    aimName: ''
  },
  getAim: function(e) {
    this.setData({
      tempAim: e.detail.value,
      aimName: e.detail.value
    })
  },
  sendAim: function(e) {
    let text = this.data.aimName
    this.setData({
      tempAim: ''
    });
    console.log(text);
    wx.navigateTo({
      url: '../current1/current1?aimName=' + this.data.aimName
    })
  }
})