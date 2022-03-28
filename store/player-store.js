import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from '../service/api_player'
import { parseLyric } from '../utils/parse-lyric'
import { setStorageParse } from '../utils/storage-io'
import { HISTORYPLAYSONGLIST_KEY } from '../constants/storage-const'

const audioContext = wx.createInnerAudioContext()
// const audioContext = wx.getBackgroundAudioManager()
const playModeNames = ['order', 'repeat', 'random']

const playerStore = new HYEventStore({
  state: {
    isFirstPlay: true,
    // isStoping: false,

    id: 0,
    currentSong: {},
    durationTime: 0,
    lyrics: [],

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    playModeIndex: 0 ,// 0:顺序播放 1：单曲循环 2: 随机播放
    playListSongs: [],
    playListIndex: 0,
    isShowPlayListSongs: false,
    playingName: 'playing',
    playAnimState: 'running',

    historyPlaySongList: []
  },
  actions: {
    /**
     * @params {Number} id:歌曲的id 
     * @params {Boolean} isRefresh: 播放同一首歌时是否需要重新播放
     */

    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (ctx.id == id && !isRefresh ) {
        const isPlaying = audioContext.paused
        if (isPlaying) {
          this.dispatch('changeMusicPlayStatuAction')
        }
        return
      }else if (ctx.id == id && isRefresh) {
        audioContext.stop()
        audioContext.play()
        return
      }

      ctx.id = id
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyrics = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ''

      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        // audioContext.title = res.songs[0].name
        for(let i = 0; i < ctx.historyPlaySongList.length; i++) {
          if (ctx.historyPlaySongList[i].id === ctx.currentSong.id) {
            ctx.historyPlaySongList.splice(i, 1)
            break
          }
        }
        ctx.historyPlaySongList.unshift(ctx.currentSong)
        setStorageParse(HISTORYPLAYSONGLIST_KEY, ctx.historyPlaySongList)
      })
  
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyrics = parseLyric(lyricString)
        ctx.lyrics = lyrics
      })

      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // audioContext.title = id
      audioContext.autoplay = true

      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        console.log(ctx.isFirstPlay)
        ctx.isFirstPlay = false
      }
    },

    setupAudioContextListenerAction(ctx) {
      audioContext.onCanplay(() => {
        audioContext.play()
      })
      audioContext.onTimeUpdate(() => {
        const currentTime = audioContext.currentTime * 1000
        ctx.currentTime = currentTime
  
        if (!ctx.lyrics.length) return
        let i = 0
        for (; i < ctx.lyrics.length; i++) {
          const lyric = ctx.lyrics[i]
          if (currentTime < lyric.time) {
            break
          }
        }

        const currentIndex = i - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyric = ctx.lyrics[currentIndex]
          const currentLyricText = currentLyric.text
          ctx.currentLyricIndex = currentIndex
          ctx.currentLyricText = currentLyricText
        }
      })
      audioContext.onEnded(() => {
        this.dispatch('changeNewMusicAction')
      })
      // audioContext.onPause(() => {
      //   this.setState('playingName', 'pause')
      //   this.setState('playAnimState', 'paused')
      // })
      // audioContext.onPlay(() => {
      //   this.setState('playingName', 'playing')
      //   this.setState('playAnimState', 'running')
      // })
      // audioContext.onStop(() => {
      //   this.setState('playingName', 'pause')
      //   this.setState('playAnimState', 'paused')
      //   ctx.isStoping = true
      // })
      // audioContext.onNext(() => {
      //   this.dispatch('changeNewMusicAction')
      // })
      // audioContext.onPrev(() => {
      //   this.dispatch('changeNewMusicAction', false)
      // })
    },

    changeMusicPlayStatuAction(ctx) {
      const isPlaying = audioContext.paused
      // if (isPlaying && ctx.isStoping) {
      //   audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
      //   audioContext.title = ctx.currentSong.name
      //   audioContext.startTime = ctx.currentTime / 1000
      //   ctx.isStoping = false
      // }
      if (isPlaying) {
        audioContext.play()
        this.setState('playingName', 'playing')
        this.setState('playAnimState', 'running')
      }else {
        audioContext.pause()
        this.setState('playingName', 'pause')
        this.setState('playAnimState', 'paused')
      }
      // isPlaying ? audioContext.play() : audioContext.pause()
    },

    changeNewMusicAction(ctx, isNext = true) {
      let index = ctx.playListIndex

      switch(ctx.playModeIndex) {
        case 0:
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1: 
          break
        case 2:
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }
    
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      }else {
        ctx.playListIndex = index
      }

      this.dispatch('playMusicWithSongIdAction', { id: currentSong.id, isRefresh: true })
    }
  }
})

export {
  audioContext,
  playerStore,
  playModeNames
}