import {request} from './request'

export function getPlayinfo(id) {
  return request({
    url: "/playlist/detail",
    params: { 
      id
    }
  })
}

export function getHotcomments(id, type) {
  return request({
    url: '/comment/hot',
    params: {
      id,
      type
    }
  })
}

export function getLatestcomments(id,limit,offset) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset
    }
  })
}
