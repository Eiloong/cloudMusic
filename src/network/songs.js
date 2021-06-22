import {request} from './request'

export function getSongs(type) {
  return request({
    url: '/top/song',
    params: {
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