import { request } from './request'

export function getMvs(area,type,order,limit,offset) {
  return request({
    url: '/mv/all',
    params: {
      area,
      type,
      order,
      limit,
      offset
    }
  })
}