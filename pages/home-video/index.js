// pages/home-video/index.js
import  { getTopMV } from '../../service/api_video'
import { playerStore } from '../../store/index' 

Page({
  data: {
    topMVs: [],
    hasMore: true,
    currentSong: {},
    isShowPlayListSongs: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   getTopMV(0).then(res => {
  //     this.setData({
  //       topMVs: res.data
  //     })
  //   })
  // },
  onLoad(options) {
    // try {
    //   const res = await getTopMV(0)
    //   this.setData({
    //     topMVs: res.data
    //   })
    // }catch(err) {
    //   console.log(err)
    // }
    this.getTopMVData(0)
    playerStore.onState('currentSong', currentSong => {
      this.setData({ currentSong })
    })
    playerStore.onState('isShowPlayListSongs', isShowPlayListSongs => {
      this.setData({ isShowPlayListSongs })
    })
  },

  async getTopMVData(offset) {
    //判断是否还有数据可以请求
    //offset = 0 第一次可以请求 下拉刷新可以请求
    if (!this.data.hasMore && offset !== 0) 
      return
    
    //loading动画
    wx.showNavigationBarLoading()

    //请求数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
      // newData = [...newData, ...res.data]
    }

    //设置数据
    this.setData({
      topMVs: newData,
      hasMore: res.hasMore
    })

    //结束动画
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/packageDetail/pages/detail-video/index?id=' + id,
    })
  },

  /** 下拉刷新 */
  onPullDownRefresh() {
    this.getTopMVData(0)
  },

  /** 页面滑到底部 */
  onReachBottom() {
    // if (!this.data.hasMore) return
    // const res = await getTopMV(this.data.topMVs.length)
    // this.setData({
    //   topMVs: this.data.topMVs.concat(res.data),
    //   hasMore: res.hasMore
    // })
    this.getTopMVData(this.data.topMVs.length)
  }

})