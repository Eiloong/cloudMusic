import {request} from './request'

export function getMvurl(id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}

export function getSimimv(mvid) {
  return request({
    url: '/simi/mv',
    params: {
      mvid
    }
  })
}

export function getDetailMv(mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}

export function getArtists(id) {
  return request({
    url: '/artists',
    params: {
      id
    }
  })
}

export function getCommentMV(id,limit,offset) {
  return request({
    url: '/comment/mv',
    params: {
      id,
      limit,
      offset
    }
  })
}

