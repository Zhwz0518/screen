import request from '@/utils/request'

export async function PermissionList(params) {
  return request({
    url: '/api/permission',
    method: 'get',
    params,
  })
}

export async function PermissionTree(params) {
  return request({
    url: '/api/permission/tree',
    method: 'get',
    params,
  })
}

export async function SearchPermissionTree(params) {
  return request({
    url: '/api/permission/list',
    method: 'get',
    params,
  })
}
// export async function doDelete(data) {
//   return request({
//     url: '/api/admin',
//     method: 'delete',
//     data,
//   })
// }

// export async function AddAdmin(data) {
//   return request({
//     url: '/api/admin',
//     method: 'post',
//     data,
//   })
// }

// export async function EditAdmin(data) {
//   return request({
//     url: '/api/admin',
//     method: 'patch',
//     data,
//   })
// }
