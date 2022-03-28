// components/play-bar/index.js
import { playerStore, playStore } from '../../store/index'

Component({

  properties: {

  },

  data: {
    currentSong: {},
    playingName: 'playing',
    playAnimState: 'running'
  },

  lifetimes: {
    attached() {
      playerStore.onStates(['currentSong', 'playingName', 'playAnimState'],({ 
        currentSong, playingName, playAnimState 
      }) => {
        if (currentSong) this.setData({ currentSong })
        if (playingName) this.setData({ playingName })
        if (playAnimState) this.setData({ playAnimState })
      })
    },
  },

  methods: {
    handlePlayBarLeftClick() {
      const id = this.data.currentSong.id
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + id,
      })
    },

    handlePlayBtnClick() {
      playerStore.dispatch('changeMusicPlayStatuAction')
    },

    handlePlayListBtnClick() {
      playerStore.setState('isShowPlayListSongs', true)
    }
  },
})
