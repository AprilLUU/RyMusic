import ryRequest  from './index'

export function getSearchHot() {
  return ryRequest.get('search/hot')
}

export function getSearchSuggest(keywords) {
  return ryRequest.get('search/suggest', {
    keywords,
    type: 'mobile'
  })
}

export function getSearchResult(keywords, offset, type = 1, limit = 30) {
  return ryRequest.get('search', {
    keywords,
    offset,
    limit,
    type,
  })
}