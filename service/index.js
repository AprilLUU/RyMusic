import { TOKEN_KEY } from '../constants/storage-const'

const token = wx.getStorageSync(TOKEN_KEY)
const BASE_URL = 'http://123.207.32.32:9001/'
// const LOGIN_BASE_URL = 'http://localhost:3000/'
const LOGIN_BASE_URL = 'http://123.207.32.32:3000/'


class RYRequest {
  constructor(baseUrl, authHeader = {}) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }

  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? {...this.authHeader, ...header} : header 
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: params,
        header: finalHeader,
        success(res) {
          resolve(res.data)
        },
        // fail(err) {
        //   reject(err)
        // }
        fail: reject
      })
    })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, 'GET', params, isAuth, header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, 'POST', data, isAuth, header)
  }
}

const ryRequest = new RYRequest(BASE_URL)
const ryLoginRequest = new RYRequest(LOGIN_BASE_URL, { token })

export default ryRequest
export { ryLoginRequest }
