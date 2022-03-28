// pages/detail-video/index.js
import {
  getMVUrl,
  getMVDetail,
  getRelatedVideo
} from '../../../service/api_video'

Page({

  data: {
    mvUrlInfo: {},
    mvDetail: {},
    relatedVideo: [],
  },

  onLoad(options) {
    const id = options.id
    this.getPageData(id)
  },

  getPageData(id) {
    Promise.all([
      getMVUrl(id),
      getMVDetail(id),
      getRelatedVideo(id)
    ]).then(res => {
      this.setData({
        mvUrlInfo: res[0].data,
        mvDetail: res[1].data,
        relatedVideo: res[2].data
      })
    })
    // getMVUrl(id).then(res => {
    //   this.setData({
    //     mvUrlInfo: res.data
    //   })
    // })

    // getMVDetail(id).then(res => {
    //   this.setData({
    //     mvDetail: res.data
    //   })
    // })

    // getRelatedVideo(id).then(res => {
    //   this.setData({
    //     relatedVideo: res.data
    //   })
    // })
  },


})