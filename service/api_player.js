import ryRequest from './index'

export function getSongDetail(ids) {
  return ryRequest.get('song/detail', {
    ids
  })
}

export function getSongLyric(id) {
  return ryRequest.get('lyric', {
    id
  })
}