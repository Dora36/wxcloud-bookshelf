// pages/scanCode/scanCode.js
const db = wx.cloud.database();
const book = db.collection('mybook');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  scanCode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        console.log(res)
        this.isExist(res.result);
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  isExist: function(isbn) {
    db.collection('mybook').where({
      isbn13: isbn
    }).get({
      success: (res) => {
        console.log(res.data)
        if (res.data.length == 0) {
          this.doubanHttp(isbn)
        } else {
          this.wxToast('已存在', 'none');
        }
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },

  doubanHttp: function(isbn) {
    wx.cloud.callFunction({
      name: 'bookinfo',
      data: {
        isbn: isbn
      },
      success: res => {
        console.log(res);
        if (res.result) {
          var bookString = res.result;
          this.addDatabase(JSON.parse(bookString));
        } else {
          this.wxToast('未找到此书', 'none')
        }
      },
      fail: err => {
        console.error(err)
      }
    })
  },

  addDatabase: function(data) {
    console.log(data);
    db.collection('mybook').add({
      data: data
    }).then(res => {
      console.log(res)
      this.wxToast('添加成功', 'success');
    }).catch(err => {
      console.log(err)
      this.wxToast('添加失败', 'none');
    })
  },
  
  wxToast: function(text, icon) {
    wx.showToast({
      title: text,
      icon: icon,
      mask: true
    })
  }







})