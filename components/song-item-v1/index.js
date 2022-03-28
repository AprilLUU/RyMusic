// components/song-item-v1/index.js
import { playerStore } from '../../store/index'

Component({

  properties: {
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
