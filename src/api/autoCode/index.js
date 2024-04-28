import request from '@/utils/request'

// 获取树形接口数据
export function getApiTreeList(params = { locale: 'zh-CN' }) {
  return request({
    url: '/apifox/projects/4112206/api-tree-list',
    headers: {
      isApiFox: true
    },
    method: 'get',
    params
  })
}

// 获取所有接口请求，返回字段id
export function getApiDetails(params = { locale: 'zh-CN' }, acheOption) {
  return request({
    url: '/apifox/api-details',
    headers: {
      isApiFox: true,
      isCache: acheOption.cache,
      success: acheOption.success
    },
    method: 'get',
    params
  })
}
// 获取所有接口请求，返回字段数据
export function getDataSchemas(params = { locale: 'zh-CN' }, acheOption) {
  return request({
    url: '/apifox/projects/4112206/data-schemas',
    headers: {
      isApiFox: true,
      isCache: acheOption.cache,
      success: acheOption.success
    },
    method: 'get',
    params
  })
}
// 获取建废所有字典类型
export function getDictsFromJf(params, acheOption) {
  return request({
    url: '/jf/city-platform/dict/type/list',
    headers: {
      isJf: true,
      isCache: acheOption.cache,
      success: acheOption.success
    },
    method: 'get',
    params
  })
}
// 新增配置
export function addConfig(data) {
  return request({
    url: '/autocode/config/add',
    method: 'post',
    data
  })
}
// 配置列表
export function getConfigs(params) {
  return request({
    url: '/autocode/config/get',
    method: 'get',
    params
  })
}

// 配置详情
export function getItemDetails(params) {
  return request({
    url: '/autocode/config/details',
    method: 'get',
    params
  })
}

// 更新配置详情
export function updateDetails(data) {
  return request({
    url: '/autocode/config/update',
    method: 'post',
    data
  })
}

// 生成代码
export function previewTable2(data) {
  return request({
    url: '/autocode/code/preview',
    method: 'post',
    data
  })
}


