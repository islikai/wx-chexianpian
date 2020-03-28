// pages/street/street.js
const { fetch } = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curId: 1,
    pageNo: 1,
    pageSize: 10,
    navList: [{
      id: 1,
      key: null,
      title: '全部',
    }, {
      id: 2,
      key: 'text',
      title: '文字',
    }, {
      id: 3,
      key: 'image',
      title: '图片',
    },{
      id: 4,
      key: 'gif',
      title: '动图',
    }, {
      id: 5,
      key: 'video',
      title: '视频',
    }],
    list: [],
    _playId: null, // 默认播放ID
  },
  // 切换导航
  onChangeNav: function (e) {
    const id = e.target.dataset.id;
    if (id == this.data.curId) {
      return;
    }
    this.setData({
      curId: id,
      list: [],
      _playId: null,
    });
    this.queryList(id);
  },
  // 图片预览
  previewImg: function (e) {
    const url = e.target.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
      fail: function (res) {
        console.log(res); 
      },
    })
  },

  // 视频播放
  videoPlay: function (e) {
    // 点击视频ID
    const id = e.currentTarget.id;
    // 上一个视频ID
    const prev_id = this.data._playId;
    // 停止上一个视频播放
    // wx.createVideoContext(prev_id + '').pause();
    // this.setData({ _playId: id });
    // 延迟500ms，再播放本视频
    setTimeout(function () {
      wx.createVideoContext(id).play();
    }, 500)
  },

  // 列表数据查询
  queryList: function (id, cb) {
    const targetNav = this.data.navList.filter(i => i.id === id)[0];
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    fetch('https://api.apiopen.top/getJoke', {
      page: this.data.pageNo,
      count: this.data.pageSize,
      type: targetNav.key,
    }).then((res) => {
      wx.hideLoading();
      this.setData({
        list: [...this.data.list, ...res.result],
      });
      cb && cb();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认请求文字内容
    this.queryList(this.data.curId);
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
    this.setData({
      pageNo: 1,
      list: [],
    }, () => {
      this.queryList(this.data.curId, () => {
        wx.stopPullDownRefresh()
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    const getPageNo = this.data.pageNo + 1;
    this.setData({
      pageNo: getPageNo,
    }, () => {
      this.queryList(this.data.curId);
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})