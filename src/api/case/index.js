// 内部信息交流相关接口
import request from '@/utils/request'


  // 新增
  export function addData(data) {
    return request({
      url: "/city-platform/bizNbxxjlXxsh/save",
      method: "post",
      data
    })
  }
  // 编辑
  export function editData(data) {
    return request({
      url: "/city-platform/bizNbxxjlXxsh/update",
      method: "post",
      data
    })
  }
  // 查询
  export function getData(data) {
    return request({
      url: "/city-platform/bizNbxxjlXxsh/getList",
      method: "post",
      data
    })
  }
  // 详情
  export function getDetails(params) {
    return request({
      url: "/city-platform/bizNbxxjlXxsh/detail",
      method: "get",
      params
    })
  }
  // 删除
  export function deleteData(data) {
    return request({
      url: "/city-platform/bizNbxxjlXxsh/delete",
      method: "post",
      data
    })
  }
