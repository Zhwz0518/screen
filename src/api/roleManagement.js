import request from '@/utils/request'
export async function getRoleList(params) {
  return request({
    url: '/api/role',
    method: 'get',
    params,
  })
}

export const doDeleteRole = (id) => {
  return request({
    url: `/api/role/${id}`,
    method: 'DELETE',
  })
}

export async function AddRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data,
  })
}

export async function EditRole(data) {
  return request({
    url: '/api/role',
    method: 'patch',
    data,
  })
}
