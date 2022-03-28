// pages/detail-search/index.js
import { 
  getSearchHot, getSearchSuggest, getSearchResult 
} from '../../../service/api_search'
import { debounce } from '../../../utils/debounce'
import stringToNodes from '../../../utils/string2nodes'
import { getStorageParse, setStorageParse } from '../../../utils/storage-io'
import { HISTORY_KEY } from '../../../constants/storage-const'
import { queryRect } from '../../../utils/query-rect'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({

  data: {
    hotKeyWords: [],
    searchValue: '',
    searchHeight: 0,
    historySearch: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSearch: [
      { searchName: '歌曲', type: 1, dataName: 'resultSongs', resName: 'songs', hasMore: true },
      { searchName: '歌单', type: 1000, dataName: 'resultSongMenus', resName: 'playlists', hasMore: true },
      { searchName: '视频', type: 1014, dataName: 'resultSongVideos', resName: 'videos', hasMore: true },
      { searchName: '电台', type: 1009, dataName: 'resultSongRadios', resName: 'djRadios', hasMore: true }
    ],
    resultSearchIndex: 0,
    resultSongs: [],
    resultSongMenus: [],
    resultSongVideos: [],
    resultSongRadios: [],
  },

  onLoad() {
    this.getPageData()
    this.getSearchHeight()
    const historySearch = getStorageParse(HISTORY_KEY)
    this.setData({ historySearch })
  },

  getPageData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  },
  
  getSearchHeight() {
    queryRect('.search').then(res => {
      const height = res[0].height
      this.setData({ searchHeight: height })
    })
  },

  async getResultSongsData(keyword, options = { offset: 0 }) {
    const { offset } = options
    const index = this.data.resultSearchIndex
    const resultSearch = this.data.resultSearch
    const dataName = resultSearch[index].dataName
    const resName = resultSearch[index].resName
    const hasMore = resultSearch[index].hasMore
    const type = resultSearch[index].type

    if (!hasMore && offset !== 0) 
      return
    
    wx.showNavigationBarLoading()

    const res = await getSearchResult(keyword, offset, type)
    let newData = this.data[dataName]
    if (offset === 0) {
      newData = res.result[resName]
    }else {
      newData = newData.concat(res.result[resName])
    }

    if (index === 3) {
      resultSearch[index].hasMore = false
    }else {
      resultSearch[index].hasMore = res.result.hasMore
    }

    this.setData({
      resultSearch,
      [dataName]: newData
    })

    wx.hideNavigationBarLoading()
  },

  async handleSearchChange(event) {
    const searchValue = event.detail
    this.setData({ searchValue })

    if (!searchValue.length) {
      this.setData({
        suggestSongs: [],
        suggestSongsNodes: [],
        resultSongs: []
      })
      debounceGetSearchSuggest.cancel()
      return
    }

    const res = await debounceGetSearchSuggest(searchValue)
    // if (!this.data.searchValue.length) return 
    const suggestSongs = res.result.allMatch
    this.setData({ suggestSongs })
    if (!suggestSongs) return

    const suggestKeyWords = suggestSongs.map(item => item.keyword)
    const suggestSongsNodes = []
    for (const keyWord of suggestKeyWords) {
      const nodes = stringToNodes(keyWord, searchValue)
      suggestSongsNodes.push(nodes)
    }
    this.setData({ suggestSongsNodes })
  },

  handleHistorySearch(searchValue) {
    let historySearch = this.data.historySearch

    for (let i = 0; i < historySearch.length; i++) {
      if (historySearch[i].first === searchValue){
        historySearch.splice(i, 1)
        break
      }
    }

    const searchObj = { first: searchValue }
    historySearch.unshift(searchObj)

    this.setData({ historySearch })

    setStorageParse(HISTORY_KEY, historySearch)
  },

  handleSearchAction() {
    const searchValue = this.data.searchValue
    this.getResultSongsData(searchValue)
    this.handleHistorySearch(searchValue)
  },

  handleKeywordItemClick(event) {
    const searchValue = event.detail
    this.setData({ searchValue })
    this.getResultSongsData(searchValue)
    this.handleHistorySearch(searchValue)
  },

  handleSearchResultItemClick(event) {
    const index = event.detail
    this.setData({ resultSearchIndex: index })
    const keyword = this.data.searchValue
    const dataName = this.data.resultSearch[index].dataName
    const isFirstClick = this.data[dataName].length
    if (!isFirstClick) {
      this.getResultSongsData(keyword)
    }
  },

  onReachBottom() {
    const keyword = this.data.searchValue
    const index = this.data.resultSearchIndex
    const dataName = this.data.resultSearch[index].dataName
    const offset = this.data[dataName].length
    if (offset) {
      this.getResultSongsData(keyword, { offset })
    }
  }

})