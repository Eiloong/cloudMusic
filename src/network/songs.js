import {request} from './request'

export function getSongs(type,limit,offset) {
  return request({
    url: '/top/song',
    params: {
      type,
      limit,
      offset
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