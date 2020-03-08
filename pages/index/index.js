const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function () {

  },
  onLoad: function () {
    var page = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              page.getUserInfo( { success: true, detail: res });
            }
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    console.log(5);
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.login();
    }
  },
  login: function () {
    console.log(111)
    var that = this

    wx.cloud.callFunction( {name:"login"} ).then( res => {
      console.info( res );
      app.globalData.openId = res.result.openid;

      console.info(app.globalData.openId )
      wx.navigateTo({
        url: '../home/home'
      })
    });

    /*
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log(7);
            app.globalData.userInfo = res.userInfo
            that.setData({
              getUserInfoFail: false,
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            //平台登录
            console.info("Navigate to home page.")
            wx.navigateTo({
              url: '../home/home'
            })
          },
          fail: function (res) {
            console.log(8);
            console.log(res);
            that.setData({
              getUserInfoFail: true
            })
          }
        })
      }
    }) */
  }  
})
