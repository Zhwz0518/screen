import request from '@/utils/request'
import { LZH, ZWL, WHL } from './urlset'

export function getList(data) {
  return request({
    url: `${LZH}/api/plhfs/detectRealtimeData/list`,
    method: 'post',
    data,
  })
}

export function doAdd(data) {
  return request({
    url: `${LZH}/api/news/product/save`,
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: `${LZH}/api/plhfs/detectRealtimeData/handle`,
    method: 'post',
    data,
  })
}

export function doDelete(params) {
  return request({
    url: `${LZH}/api/plhfs/detectRealtimeData/delete`,
    method: 'post',
    params,
  })
}

export async function getDetail(params) {
  return request({
    url: `${LZH}/api/plhfs/detectRealtimeData/detail`,
    method: 'get',
    params,
  })
}
