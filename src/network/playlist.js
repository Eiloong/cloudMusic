import {request} from './request'

export function getHighquality(limit,cat) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit,
      cat
    }
  })
}

export function getPlaylist(limit,offset,cat) {
  return request({
    url: 'top/playlist',
    params: {
      limit,
      offset,
      cat,
    }
  })
}