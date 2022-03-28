// components/search-suggest-area/index.js
Component({

  properties: {
    suggestSongs: {
      type: Array,
      value: []
    },
    suggestSongsNodes: {
      type: Array,
      value: []
    },
    searchValue: {
      type: String,
      value: ''
    }
  },

  data: {

  },

  methods: {
    handleItemClick(event) {
      const keyword = event.currentTarget.dataset.keyword
      this.triggerEvent('click', keyword)
    }
  }
})
