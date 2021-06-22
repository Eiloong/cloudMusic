import {request} from './request'

export function getBanner() {
  return request({
    url: '/banner'
  })
}

export function getPersonalized() {
  return request({
    url: '/personalized'
  })
}

export function getNewsong() {
  return request({
    url: '/personalized/newsong'
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

export function getMvs() {
  return request({
    url: 'personalized/mv'
  })
}