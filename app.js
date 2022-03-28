// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY, HISTORY_KEY, HISTORYPLAYSONGLIST_KEY } from './constants/storage-const'
import { playerStore } from './store/index'
import { setStorageParse, getStorageParse } from './utils/storage-io'

App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRadio: 0,
  },
  async onLaunch() {
    //1.获取设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight

    //2.获取设备高宽比
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio
    
    //3.设置历史搜索
    const historySearch = getStorageParse(HISTORY_KEY)
    if (!historySearch) {
      setStorageParse(HISTORY_KEY, [])
    }
  
    //4.设置历史播放歌曲
    const historyPlaySongList = getStorageParse(HISTORYPLAYSONGLIST_KEY)
    if (!historyPlaySongList) {
      setStorageParse(HISTORYPLAYSONGLIST_KEY, [])
    }else {
      playerStore.setState('historyPlaySongList', historyPlaySongList)
    }

    //5.用户登录
    this.handleLogin()
  },

  async handleLogin() {
    const token = wx.getStorageSync(TOKEN_KEY)
    //检验token是否过期
    const checkResult = await checkToken()
    //判断session是否过期
    const isSessionExpire = await checkSession()
    // console.log(checkResult, isSessionExpire)
    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },

  async loginAction() {
    const code = await getLoginCode()
    const result = await codeToToken(code)
    const token = result.token
    wx.setStorageSync(TOKEN_KEY, token)
  }
})
