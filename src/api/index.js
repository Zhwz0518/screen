import request from '@/utils/request'

export async function getList(params) {
  return request({
    url: '/api/index',
    method: 'get',
    params,
  })
}

export const doDelete = (id) => {
  return request({
    url: `/api/user/${id}`,
    method: 'DELETE',
  })
}
export async function UpMember(params) {
  return request({
    url: '/api/user/upload',
    method: 'post',
    params,
  })
}
export async function confirmUp(data) {
  return request({
    url: '/api/user/upload/confirm',
    method: 'post',
    data,
  })
}
export async function doAdd(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data,
  })
}

export async function doEdit(data) {
  return request({
    url: '/api/user',
    method: 'patch',
    data,
  })
}
export async function getAllSite(params) {
  return request({
    url: '/api/site/all',
    method: 'get',
    params,
  })
}
export async function getAllTime(params) {
  return request({
    url: '/api/times/all',
    method: 'get',
    params,
  })
}
