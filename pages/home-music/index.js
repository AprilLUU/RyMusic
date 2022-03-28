// pages/home-music/index.js
import { rankingStore, rankingMap, playerStore } from '../../store/index'
import { getBanners, getSongMenu } from '../../service/api_music'

Page({
  data: {
    banners: [],
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    rankings: {
      0: {},
      2: {},
      3: {}
    },
    showRankings: false,
    currentSong: {},
    isShowPlayListSongs: false,
  },

  onLoad(options) {
    this.getPageData()
    this.getRankingStoreData()
    this.getPlayerStoreData()
    this.setData( {
      showRankings: true
    })
  },

  getPageData() {
    getBanners().then(res => {
      //setData是同步的，根据新数据重新渲染，渲染的过程是异步的
      //react setState是异步的（目的是为了保持js中的数据与html以及子组件中的数据保持一致，
      //以避免js中数据更新成功，界面未更新成功的情况）
      this.setData({
        banners: res.banners
      })
    })

    getSongMenu().then(
      res => {
        this.setData({
          hotSongMenu: res.playlists
        })
      }
    )

    getSongMenu('华语').then(
      res => {
        this.setData({
          recommendSongMenu: res.playlists
        })
      }
    )
  },

  getRankingStoreData() {
    rankingStore.dispatch('getRankingDataAction')
    rankingStore.onState('hotRanking', res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({
        recommendSongs
      })
    })
    rankingStore.onState('newRanking', this.getRankingHandler(0))
    rankingStore.onState('originRanking', this.getRankingHandler(2))
    rankingStore.onState('upRanking', this.getRankingHandler(3))
  },

  getRankingHandler(idx) {
    return res => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {
        name,
        coverImgUrl,
        playCount,
        songList,
      }
      const newRankings = {...this.data.rankings, [idx]: rankingObj}
      this.setData({
        rankings: newRankings
      })
    }
  },

  getPlayerStoreData() {
    playerStore.onStates(['currentSong', 'isShowPlayListSongs'], ({ currentSong, isShowPlayListSongs }) => {
      if (currentSong) this.setData({ currentSong })
      if (isShowPlayListSongs !== undefined) this.setData({ isShowPlayListSongs })
    })
  },

  handleSearchClick() {
    wx.navigateTo({
      url: '/packageDetail/pages/detail-search/index',
    })
  },

  handleMoreClick() {
    this.navigateToDetailSongPage('hotRanking')
  },

  handleRankingItemClick(event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongPage(rankingName)
  },

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.recommendSongs)
    playerStore.setState('playListIndex', index)
  },

  navigateToDetailSongPage(rankingName) {
    wx.navigateTo({
      url: `/packageDetail/pages/detail-songs/index?ranking=${rankingName}&type=ranking`,
    })
  },

  onUnload() {
  },
})