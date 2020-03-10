import area from './area.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: area,
    selectCitying: false,
    city: "440304",
    cityName: "广东省 深圳市 福田区",

    school: "0001",
    addingSchool: false,
    schools: [
      { value: "0001", text: "荔园小学玮鹏校区" }
    ],

    schoolName: "",

  },

  updateSchools:function () {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })    
    db.collection('tbl_school').where({city: this.data.city}).get().then(res => {
      var array = [];
      res.data.map( item=> { 
        var t = item.name;
        if( item.approved )
          t += '(待审批)'
        array.push({ text: t,  approved: item.approved,  value: item._id} )
      });

      this.setData({
        schools: array
      });

      if( array.length > 0) {
        this.setData( {school: array[0].value} );
      }
    });

  },

  onClickLeft: function (event) {
    wx.navigateBack({});
  },

  onChangeCity: function(event) {
    this.setData( {selectCitying:true })
  },

  onCancelCity: function(event) {
    this.setData({ selectCitying: false, selectSchooling:false })
  },

  onSelectedCity: function(event) {
    this.setData({ 
      selectCitying: false,
      city: event.detail.values[2].code,
      cityName: [event.detail.values[0].name, event.detail.values[1].name, event.detail.values[2].name].join(' ') 
       })
    this.updateSchools();
  },

  toAddSchool: function (event) {
    this.setData({ addingSchool: true, schoolName: '' })
  },

  onInputSchoolName: function(event) {
    this.setData( {schoolName: event.detail.value})
  },

  addSchool : function(event) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })
    
    //todo: check name

    db.collection('tbl_school').add( {
      data: {
        name: this.data.schoolName,
        city: this.data.city,
        approved: false,
      }

    } );
    this.setData({ addingSchool: false })
    this.updateSchools();
  },

  onSelectedSchool: function (event) {
    console.info( event );
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
    this.updateSchools();
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