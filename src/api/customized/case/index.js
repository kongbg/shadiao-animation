// 案例接口
import request from '@/utils/request'
    // 新增
    export function createData(data) {
      return request({
        url: "/city-platform/bizNbxxjlXxsh/save",
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
    // 更新
    export function updateData(data) {
      return request({
        url: "/city-platform/bizNbxxjlXxsh/update",
        method: "post",
        data
      })
    }
    // 列表
    export function getData(data) {
      return request({
        url: "/city-platform/bizNbxxjlXxsh/getList",
        method: "post",
        data
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
    // 导出
    export function exportData(data, proxy, feilName, suffix) {
      proxy.download("/city-platform/bizNbxxjlXxsh/getList",data,`${feilName}_${new Date().getTime()}${suffix}`);
    }

