// pages/detail-songs/index.js
import { playerStore, rankingStore } from '../../../store/index'
import { getSongMenuDetail } from '../../../service/api_music'

Page({

  data: {
    type: '',
    ranking: '',
    songMenuInfo: {},
  },

  onLoad(options) {
    const type = options.type
    this.setData({ type })

    if (type === 'menu') {
      const id = options.id
      this.getSongMenuData(id)
    }else if (type === 'ranking') {
      const ranking = options.ranking
      this.setData({ ranking })
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }
  },

  getSongMenuData(id) {
    getSongMenuDetail(id).then(res => {
      this.setData({
        songMenuInfo: res.playlist
      })
    })
  },

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.songMenuInfo.tracks)
    playerStore.setState('playListIndex', index)
  },

  onUnload() {
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
    }
  },
  
  getRankingDataHandler(res) {
    this.setData({
      songMenuInfo: res
    })
  }

})