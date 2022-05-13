import request from '@/utils/request'
import { LZH, ZWL, WHL } from './urlset'

export async function login(data) {
  return request({
    url: `${LZH}/api/login/account`,
    method: 'post',
    data,
  })
}

export function getUserInfo(data) {
  return request({
    url: `${WHL}/api/u/user/detailByCurrentUser`,
    method: 'get',
    data,
  })
}

export function getUserApp(data) {
  return request({
    url: `${WHL}/api/u/user/appListByUserId`,
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: `${LZH}/api/login/logout`,
    method: 'post',
  })
}
export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
