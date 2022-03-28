import { ryLoginRequest } from './index'

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success(res) {
        const code = res.code
        resolve(code)
      },
      fail: reject
    })
  })
}

export function codeToToken(code) {
  return ryLoginRequest.post('login', { code })
}

export function checkToken() {
  return ryLoginRequest.post('auth', {}, true)
}

export function checkSession() {
  return new Promise(resolve => {
    wx.checkSession({
      success() {
        resolve(true)
      },
      fail() {
        resolve(false)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: 'getUserInfo',
      success: resolve,
      fail: reject
    })
  })
}