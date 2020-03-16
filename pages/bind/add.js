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

    school: {},
    addingSchool: false,
    schools: [
      { value: "0001", text: "荔园小学玮鹏校区" }
    ],

    addingClasses: false,
    classesList: [],
    classes : {},

    role: "1",
    isTeacher: false,
    roleList : [ 
      { value: "1", text: "家长、监护人、学生" },
      { value: "2", text: "老师、管理员" },
     ],
    teacher: "1",
    teachers: [
      { value: "1", text: "班主任" },
      { value: "2", text: "语文" },
      { value: "3", text: "数学" },
      { value: "4", text: "英语" },
      { value: "5", text: "科学" },
      { value: "6", text: "体育" },
      { value: "7", text: "音乐" },
      { value: "8", text: "美术" },
      { value: "9", text: "物理" },
      { value: "10", text: "化学" },
      { value: "11", text: "生物" },
      { value: "12", text: "历史" },
      { value: "13", text: "地理" },
      { value: "14", text: "道德/政治/公民" },
      { value: "15", text: "外教" },
      { value: "99", text: "其他" }
    ],

    teacherName: "",

    studentRole: "3",
    studentRoles : [
      { value: "1", text: "学生本人" },
      { value: "2", text: "爸爸" },
      { value: "3", text: "妈妈" },
      { value: "4", text: "爷爷" },
      { value: "5", text: "奶奶" },
      { value: "6", text: "外公" },
      { value: "7", text: "外婆" },
      { value: "8", text: "阿姨" },
      { value: "9", text: "叔叔" },
      { value: "10", text: "哥哥" },
      { value: "11", text: "姐姐" },
      { value: "12", text: "弟弟" },
      { value: "13", text: "妹妹" },
      { value: "14", text: "补习班老师" },
      { value: "99", text: "其他家人" },
    ],
    studentID: 0,

  },

  updateSchools:function () {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })    
    db.collection('tbl_school').where({city: this.data.city}).get().then(res => {
      var array = [];
      res.data.map( item=> { 
        var t = item.name;        
        if( !item.approved )
          t += '(待审批)'
        array.push({ text: t,  approved: item.approved,  value: item._id} )
      });

      this.setData({
        schools: array
      });

      if( array.length > 0) {
        this.setData( {school: array[0]} );
      }
      this.onUpdatedSchool();
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
    this.setData({ 
      school: this.data.schools.find(item => item.value == event.detail) 
    });    
    this.onUpdatedSchool();
  },

  onUpdatedSchool : function () {
    this.updateClasses();
  },

  // Add Classes
  toAddClasses: function(event) {
    this.setData({ addingClasses: true })
  },

  onClassesClose: function (event) {
    this.setData({
      selectCitying: false,
      addingSchool: false,       
      addingClasses: false })
  },

  onAddClasses: function (event) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })

    //todo: check name
    console.info( event );

    db.collection('tbl_classes').add({
      data: {
        name: event.detail.value.name,
        school: this.data.school.value,
        count: event.detail.value.count,
        approved: false,
      }

    }); 
    this.setData({ addingClasses: false })
    this.updateClasses();
  },

  updateClasses: function() {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })
    db.collection('tbl_classes').where({ school: this.data.school.value }).get().then(res => {
      var array = [];
      res.data.map(item => {
        var t = item.name;
        if (!item.approved)
          t += '(待审批)'
        t+='(' + item.count + ')'
        array.push({ text: t, approved: item.approved, value: item._id })
      });

      this.setData({
        classesList: array
      });

      if (array.length > 0) {
        this.setData({ classes: array[0] });
      }
    });
  },

  onSelectedClasses: function(event) {
    this.setData({
      classes: this.data.classesList.find(item => item.value == event.detail) 
    });
  },

  // Role
  onSelectedRole: function(event) {
    this.setData({
      role: event.detail,
      isTeacher: (event.detail == "2") ? true : false
    });
  },

  onTeacherNameChanged: function(event) {
    this.setData( {
      teacherName: event.detail
    })
  },

  onStudentIdChanged: function (event) {
    this.setData({
      studentID: event.detail
    })
  },

  bindTeacher: function(event) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })

    //todo: check name
    db.collection('tbl_binding').add({
      data: {
        school: this.data.school,
        classes: this.data.classes,
        teacher: true,
        course: this.data.teachers.find(item => item.value == this.data.teacher),
        teacherName: this.data.teacherName,
        approved: false,
      }
    }); 

    wx.navigateBack({
      delta: 2
    });
    
  },

  bindStudent: function (event) {
    const db = wx.cloud.database({
      env: 'enroll2-oll29'
    })

    //todo: check name
    db.collection('tbl_binding').add({
      data: {
        school: this.data.school,
        classes: this.data.classes,
        teacher: false,
        family: this.data.studentRoles.find(item => item.value == this.data.studentRole),
        student: { id: this.data.studentID, name: "" },
        approved: true,
      }
    });

    wx.navigateBack({
      delta: 2
    });
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