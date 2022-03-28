import ryRequest from './index'

export function getBanners() {
  return ryRequest.get('banner', {
    type: 2
  })
}
export function getRankings(idx) {
  return ryRequest.get('top/list', {
    idx
  })
}

export function getSongMenu(cat='全部', limit=6, offset=0) {
  return ryRequest.get('top/playlist', {
    cat,
    limit,
    offset
  })
}

export function getSongMenuTags() {
  return ryRequest.get('playlist/hot')
}

export function getSongMenuDetail(id) {
  return ryRequest.get('playlist/detail/dynamic', {
    id
  })
}