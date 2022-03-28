// components/play-song-list/index.js
import { playerStore } from '../../store/index'
import { queryComponentRect } from '../../utils/query-rect'

Component({

  properties: {
    isHomePage: {
      type: Boolean,
      value: true
    }
  },

  data: {
    screenWidth: 0,
    screenHeight: 0,
    maxHeight: 0,
    listShadowHeight: 0,
    playListSongs: [],
    playListIndex: 0
  },

  lifetimes: {
    attached() {
      const globalData = getApp().globalData
      const screenWidth = globalData.screenWidth
      const screenHeight = globalData.screenHeight
      this.setData({
        screenWidth,
        screenHeight,
        maxHeight: Math.floor(screenHeight / 2)
      })

      playerStore.onStates(['playListSongs', 'playListIndex'], ({
        playListSongs,
        playListIndex
      }) => {
        if (playListSongs) this.setData({ playListSongs })
        if (playListIndex) this.setData({ playListIndex })
      })
    },
    
    ready() {
      queryComponentRect('.list', this).then(res => {
        const height = res.height
        const screenHeight = this.data.screenHeight
        const listShadowHeight = screenHeight - height
        this.setData({ listShadowHeight })
      })
    }
  },

  methods: {
    handleListShadowClick() {
      playerStore.setState('isShowPlayListSongs', false)
    },

    handleSongListItemClick(event) {
      const id = event.currentTarget.dataset.id
      const index = event.currentTarget.dataset.index
      const isHomePage = this.properties.isHomePage
      if (isHomePage) {
        wx.navigateTo({
          url: '/packagePlayer/pages/music-player/index?id=' + id,
        })
      }else {
        wx.redirectTo({
          url: '/packagePlayer/pages/music-player/index?id=' + id,
        })
      }
      playerStore.dispatch('playMusicWithSongIdAction', { id })
      playerStore.setState('playListIndex', index)
      playerStore.setState('isShowPlayListSongs', false)
    }
  }
})
