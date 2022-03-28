// components/search-keyword-area/index.js
Component({

  properties: {
    hotKeyWords: {
      type: Array,
      value: []
    },
    title: {
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
  },
  
})
