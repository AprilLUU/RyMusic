export function setStorageParse(key, value) {
  const strValue = JSON.stringify(value)
  wx.setStorageSync(key, strValue)
}

export function getStorageParse(key) {
  const value = wx.getStorageSync(key)
  if (!value) return false
  const parseValue = JSON.parse(value)
  return parseValue
}