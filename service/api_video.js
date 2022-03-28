import ryRequest from './index'

export function getTopMV(offset, limit = 10) {
  return ryRequest.get('top/mv', {
    offset,
    limit
  })
}

/**
 * 请求MV播放地址
 * @param {number} id mv的id 
 */
export function getMVUrl(id) {
  return ryRequest.get('mv/url', {
    id
  })
}

export function getMVDetail(mvid) {
  return ryRequest.get('mv/detail', {
    mvid
  })
}

export function getRelatedVideo(id) {
  return ryRequest.get('related/allvideo', {
    id
  })
}