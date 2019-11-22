Page({/*调试的时候因为是电脑，所以定位不准，手机上没有问题 */
  data: {
    beginlatitude: null,
    beginlongitude: null,
    beginName: '福州大学',/* 需要获取逆地址解析*/
    aimName: '',
    aimlatitude: null,/*未处理 */
    aimlongitude: null,
    polyline: []
  },

  onLoad: function (option) {
    var that = this
    that.setData({
      aimName:option.aimName
    }),
    wx.getLocation({
      success: res => {
        that.setData({
          beginlatitude: res.latitude,
          beginlongitude: res.longitude
        })
        that.setData({
          polyline: [{
            points: [{/*初始地坐标 */
              longitude: 119.13139,/*需要获取 */
              latitude: 26.15021/*需要获取 */
            }, {/*目的地坐标*/
                longitude: 119.13139,/*需要获取 */
                latitude: 26.16021/*需要获取 */
            }],
            color: "#FF0000DD",
            width: 4,
            dottedLine: true
          }]
        })
      }
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
  jumpToNext:function(){
    wx.navigateTo({
      url: '../current3/current3?aimName='+this.data.aimName,
    })
  }
})