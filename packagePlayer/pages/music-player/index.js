// pages/music-player/index.js
import { audioContext, playerStore, playModeNames } from '../../../store/index'

Page({

  data: {
    id: 0,
    currentSong: [],
    durationTime: 0,
    lyrics: [],

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    playModeIndex: 0,
    playModeName: 'order',
    playingName: 'playing',

    sliderValue: 0,
    isSliderChanging: false,
    isMusicLyric: true,
    isShowPlayListSongs: false,
    lyricScrollTop: 0,
    currentPage: 0,
    contentHeight: 0
  },

  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.setupPlayerStoreListener()
    this.setContentHeight()
  },

  setContentHeight() {
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navBarHeight
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight })
    const deviceRadio = globalData.deviceRadio
    this.setData({ isMusicLyric: deviceRadio >= 2 })  
  },
  
  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },

  handleSliderChange(event) {
    const value = event.detail.value
    const durationTime = this.data.durationTime
    const currentTime = durationTime * value / 100
    const isPlaying = audioContext.paused
    if (isPlaying) {
      playerStore.setState('playingName', 'playing')
    } // else {
      //   audioContext.pause()
      // }
    audioContext.seek(currentTime / 1000)
    this.setData({ 
      sliderValue: value,
      isSliderChanging: false
    })
  },

  handleSliderChanging(event) {
    const value = event.detail.value
    const durationTime = this.data.durationTime
    const currentTime = durationTime * value / 100
    this.setData({ 
      isSliderChanging: true, 
      currentTime 
    })
  },

  handleBackBtnClick() {
    wx.navigateBack()
  },

  handleModeBtnClick() {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3)  playModeIndex = 0
    playerStore.setState('playModeIndex', playModeIndex)
  },
  
  handlePauseBtnClick() {
    playerStore.dispatch('changeMusicPlayStatuAction')
  },

  handlePrevBtnClick() {
    playerStore.dispatch('changeNewMusicAction', false)
  },

  handleNextBtnClick() {
    playerStore.dispatch('changeNewMusicAction')
  },

  handleCurrrentMusicListener({ 
    currentSong, 
    durationTime, 
    lyrics
  }) {
      if (currentSong !== undefined) this.setData({ currentSong })
      if (durationTime !== undefined) this.setData({ durationTime })
      if (lyrics !== undefined) this.setData({ lyrics })
  },

  handleCurrentLyricListener({
    currentTime, 
    currentLyricIndex, 
    currentLyricText
  }) {
    if (currentTime !== undefined && !this.data.isSliderChanging) {
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({ currentTime, sliderValue })
    }
    if (currentLyricIndex !== undefined) {
      this.setData({
        currentLyricIndex,
        lyricScrollTop: currentLyricIndex * 35
      })
    }
    if (currentLyricText !== undefined) {
      this.setData({ currentLyricText })
    }
  },

  handlePlayModeListener({
    playModeIndex,
    playingName
  }) {
    if (playModeIndex !== undefined) {
      this.setData({ 
        playModeIndex,
        playModeName: playModeNames[playModeIndex]
      })
    }
    if (playingName !== undefined) {
      this.setData({ playingName })
    }
  },

  handlePlaySongListBtnClick() {
    playerStore.setState('isShowPlayListSongs', true)
  },

  setupPlayerStoreListener() {
    playerStore.onStates(['currentSong', 'durationTime', 'lyrics'], this.handleCurrrentMusicListener)
    playerStore.onStates(['currentTime', 'currentLyricIndex', 'currentLyricText'], this.handleCurrentLyricListener)
    playerStore.onStates(['playModeIndex', 'playingName'], this.handlePlayModeListener)
    playerStore.onState('isShowPlayListSongs', isShowPlayListSongs => {
      this.setData({ isShowPlayListSongs })
    })
  },

  onUnload() {
    // playerStore.offStates(['currentSong', 'durationTime', 'lyrics'], this.handleCurrrentMusicListener)
    // playerStore.offStates(['currentTime', 'currentLyricIndex', 'currentLyricText'], this.handleCurrentLyricListener)
    // playerStore.offStates(['playModeIndex', 'playingName'], this.handlePlayModeListener)
  },

})