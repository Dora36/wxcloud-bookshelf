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
  onLoad: function (options) {
    console.log(options)
    book.doc(options.id).get({
      success: (res)=> {
        console.log(res.data);
        this.setData({
          book:res.data,
          id:options.id
        })
      }
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

  },

  ebook:function(){
    wx.navigateTo({
      url: "/pages/ebook/ebook?url=" + this.data.book.ebook_url
    })
  },

  update:function(){
    console.log('更新')
  },

  delete:function(){
    console.log('删除')
    book.doc(this.data.id).remove({
      success: function (res) {
        console.log(res)
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
})