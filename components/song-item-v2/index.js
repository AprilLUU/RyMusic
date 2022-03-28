// components/song-item-v2/index.js
import { playerStore } from '../../store/index'

Component({

  properties: {
    index: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: {}
    }
  },

  data: {

  },

  methods: {
    handleSongItemClick() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + id,
      })
      playerStore.dispatch('playMusicWithSongIdAction', { id })
    }
  }
})
