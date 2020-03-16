const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindings: [],
    showingPublish: false,
    checkedAll : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    if (app.globalData.userInfo ) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } 
  },

  onBindClick: function(event) {

    wx.requestSubscribeMessage({
      tmplIds: ['KhaxRzQyVS5rcpNhxGCPqKzYxJdgtZz4nnFQc-9P17U', 'WZ9rVJ51dqInweEj1gqjcLRu9u6JFCz7dXb0QODOSyg'],
      success(res) { console.info(res) },
      fail(res) { console.info(res) }
    })


    wx.navigateTo({
      url: '/pages/bind/index',
    })
  },

  onChangeAll: function(event) {
    this.setData({
      checkedAll: !this.data.checkedAll
    })
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
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })
    db.collection('tbl_binding').get().then(res => {

      res.data.map( item=> {        
        item.title = (item.teacher)?item.course.text+item.teacherName+"老师":item.student.id+"号"+item.family.text;
      })

      this.setData({
        bindings: res.data
      })
    });
  },

  toPublish: function(event) {
    this.setData( {
      showingPublish: !this.data.showingPublish
    })
  },

  publishHomework: function (event) {
    console.info(event)
    wx.cloud.callFunction({ name: "publish" }).then(res => {
      console.info(res);
    })
    this.toPublish(event);
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