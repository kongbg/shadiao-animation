// 公众咨询意见管理
import request from '@/utils/request'
    // 新增
    export function addData(data) {
      return request({
        url: "/city-platform/bizCsGzzxyj/update",
        method: "put",
        data
      })
    }
    // 编辑
    export function editData(data) {
      return request({
        url: "/city-platform/bizCsGzzxyj/update",
        method: "put",
        data
      })
    }
    // 查询
    export function getData(params) {
      return request({
        url: "/city-platform/bizCsGzzxyj/page",
        method: "get",
        params
      })
    }
    // 详情
    export function getDetails(params) {
      return request({
        url: "/city-platform/bizCsGzzxyj/getById",
        method: "get",
        params
      })
    }
    // 删除
    export function deleteData(data) {
      return request({
        url: "/city-platform/bizCsGzzxyj/delete",
        method: "delete",
        data
      })
    }
    // 导出
    export function exportData(data, proxy, feilName, suffix) {
      proxy.download("/city-platform/bizCsGzzxyj/page",data,`${feilName}_${new Date().getTime()}${suffix}`);
    }

