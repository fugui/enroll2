import area from './area.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: area,
    selectCitying: false,
    city: "440304",
    cityName: "广东省 深圳市 福田区"
  },

  onClickLeft: function (event) {
    wx.navigateBack({});
  },

  onChangeCity: function(event) {
    this.setData( {selectCitying:true })
  },

  onCancelCity: function(event) {
    this.setData({ selectCitying: false })
  },

  onSelectedCity: function(event) {
    this.setData({ 
      selectCitying: false,
      city: event.detail.values[2].code,
      cityName: [event.detail.values[0].name, event.detail.values[1].name, event.detail.values[2].name].join(' ') 
       })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})