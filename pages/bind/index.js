// pages/bind/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })
    db.collection('tbl_binding').get().then(res => {

      var array = [];
      res.data.map(item => {
        let relationship = "";
        if( item.teacher ) {
          relationship = item.course.text + item.teacherName + "老师";
        } else {
          relationship = item.student.id + "号" + item.student.name + item.family.text;
        }

        array.push({ _id: item._id, classes_name: item.classes.text, relationship: relationship })
      });

      this.setData( {
        bindings: array
      } )
    });
  },

  onClickLeft: function(event) {
    wx.navigateBack({});
  },

  onClickAdd: function(event) {
    wx.navigateTo({
      url: 'add',
    })
  },

  onDeleteBinding: function(event) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })
    db.collection('tbl_binding').doc( event.target.dataset.id).remove();

    this.onLoad( {} );
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