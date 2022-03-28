// components/song-menu/index.js
// const app = getApp()

Component({

  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },
    songMenu: {
      type: Array,
      value: []
    }
  },

  data: {
    // screenWidth: app.globalData.screenWidth
  },

  methods: {
    handleMoreClick() {
      wx.navigateTo({
        url: '/packageDetail/pages/detail-menu/index',
      })
    }
  }
})
