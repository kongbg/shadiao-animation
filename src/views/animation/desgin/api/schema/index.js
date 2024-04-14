import request from '@/utils/request'

// 保存Schema
export function saveSchema(data) {
  return request({
    url: '/saveSchema',
    method: 'post',
    data
  })
}

// 查询Schema
export function getLists(params) {
  return request({
    url: '/getSchema',
    method: 'get',
    params
  })
}

// 删除Schema
export function deleteData(data) {
  return request({
    url: '/deleteSchema',
    method: 'post',
    data
  })
}
// 更新Schema
export function updateData(data) {
  return request({
    url: '/updateSchema',
    method: 'post',
    data
  })
}
