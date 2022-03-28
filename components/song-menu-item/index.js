// components/song-menu-item/index.js
Component({

  externalClasses: ['item-play-counter', 'item-bottom'],

  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  data: {

  },

  methods: {
    handleMenuItemClick(event) {
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/packageDetail/pages/detail-songs/index?id=${id}&type=menu`,
      })
    },
  }
})
