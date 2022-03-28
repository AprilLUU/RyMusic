export function queryRect(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}

export function queryComponentRect(selector, component) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery().in(component)
    query.select(selector).boundingClientRect(resolve).exec()
  })
}
