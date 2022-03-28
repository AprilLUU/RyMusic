// components/search-result-area/index.js
import { playerStore, playStore } from '../../store/index'

Component({

  properties: {
    resultSongs: {
      type: Array,
      value: []
    },
    resultSongMenus: {
      type: Array,
      value: []
    },
    resultSongVideos: {
      type: Array,
      value: []
    },
    resultSongRadios: {
      type: Array,
      value: []
    },
    resultSearch: {
      type: Array,
      value: []
    },
    searchHeight: {
      type: Number,
      value: []
    }
  },

  data: {
    resultSearchIndex: 0
  },
  methods: {
    handleSongItemClick(event) {
      const index = event.currentTarget.dataset.index
      playerStore.setState('playListSongs', this.properties.resultSongs)
      playerStore.setState('playListIndex', index)
    },

    handleResultSearchItemClick(event) {
      const index = event.currentTarget.dataset.index
      this.setData({ resultSearchIndex: index })
      this.triggerEvent('click', index)
    },
    
    handleVideoItemClick(event) {
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/packageDetail/pages/detail-video/index?id=' + id,
      })
    },

    handleMenuItemClick(event) {
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/packageDetail/pages/detail-songs/index?id=${id}&type=menu`,
      })
    }
  }
})
