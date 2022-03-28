// pages/home-profile/index.js
import { getUserInfo } from '../../service/api_login'
import { playerStore } from '../../store/index'
import { getStorageParse } from '../../utils/storage-io'
import { HISTORYPLAYSONGLIST_KEY } from '../../constants/storage-const'

Page({

  data: {
    userInfo: {},
    currentSong: {},
    historyPlaySongList: {},
    isShowPlayListSongs: false
  },

  onLoad() {
    playerStore.onStates(['currentSong', 'isShowPlayListSongs'], ({ 
      currentSong,
      isShowPlayListSongs
    }) => {
      if (currentSong) this.setData({ currentSong })
      if (isShowPlayListSongs !== undefined) this.setData({ isShowPlayListSongs })
    })

    this.getHistoryPlaySongList()
  },

  onShow() {
    this.getHistoryPlaySongList()
  },

  getHistoryPlaySongList() {
    const historyPlaySongList = getStorageParse(HISTORYPLAYSONGLIST_KEY)
    this.setData({ historyPlaySongList })
  },

  async handleGetUserInfo() {
    const result = await getUserInfo()
    const userInfo = result.userInfo
    this.setData({ userInfo })
  },

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.historyPlaySongList)
    playerStore.setState('playListIndex', index)
  }

})