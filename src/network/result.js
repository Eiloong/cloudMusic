import { request } from "./request";

export function getResult(keywords, limit, offset, type) {
  return request({
    url: '/search',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}

export function getSongurl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}