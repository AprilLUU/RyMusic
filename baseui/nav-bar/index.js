// components/navgation-bar/index.js
Component({

  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String,
      value: '默认标题'
    }
  },

  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    navBarHeight: getApp().globalData.navBarHeight
  },

  // lifetimes: {
  //   ready() {
  //     const info = wx.getSystemInfoSync()
  //     console.log(info)
  //   }
  // },

  methods: {
    handleLeftClick() {
      this.triggerEvent('click')
    }
  }
})
