import request from '@/utils/request'

export function getRouterList(params) {
  return request({
    url: '/api/permission',
    method: 'get',
    params,
  })
}
