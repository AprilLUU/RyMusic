// pages/detail-menu/index.js
import { getSongMenu, getSongMenuTags } from '../../../service/api_music'
Page({

  data: {
    songMenuList: []
  },

  onLoad: function (options) {
    this.getPageData()
  },

  async getPageData() {
    const res  = await getSongMenuTags()
    const tags = res.tags
    const songMenuList = []
    const promises = []

    for (let index in tags) {
      const name = tags[index].name
      songMenuList[index] = { name, list: [] }
      promises.push(getSongMenu(name))
    }

    Promise.all(promises).then(menuList => {
      for (let index in menuList) {
        const list = menuList[index].playlists
        songMenuList[index].list = list
      }
      this.setData({ songMenuList })
    })
  }

})