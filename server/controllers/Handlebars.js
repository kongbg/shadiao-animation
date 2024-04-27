import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
// const fs = require('fs')
// const path = require('path')
// server\controllers\Handlebars.js
function resolvePath(filePath) {
  return path.resolve(__dirname, filePath)
}

let apis = []
// 搜索组件配置
let searchConfig = []
// 表格配置
let columns = []

// 注册 Handlebars 的 helper 函数
registerHelper()

let domains = {
  domains: [
    {
      list: [
        {
          label: '功能名称',
          value: '新增',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'addData',
          disabled: true
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '编辑',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'editData',
          disabled: true
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '查询',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'getData',
          disabled: true
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '详情',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'getDetails',
          disabled: true
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '删除',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'deleteData',
          disabled: true
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    }
  ]
}

export const createCode = (options) => {
  options.apiconfig = JSON.parse(options.apiconfig || JSON.stringify(domains))
  options.queryColumn = JSON.parse(options.queryColumn || [])
  options.listColumn = JSON.parse(options.listColumn || [])
  options.addColumn = JSON.parse(options.addColumn || [])
  options.editColumn = JSON.parse(options.editColumn || [])
  options.detailColumn = JSON.parse(options.detailColumn || [])

  let code = {}
  let configs = []
  if (options.type == 1) {
    configs = ['api', 'list', 'action', 'config']
  }

  configs.forEach((conf) => {
    switch (conf) {
      case 'list':
        code[conf] = createList(options)
        break
      case 'api':
        code[conf] = createApi(options)
        break
      case 'config':
        code[conf] = createConfig(options)
        break
      case 'action':
        code[conf] = createAction(options)
        break
    }
  })

  return JSON.stringify(code)
}

function createApi(options) {
  // 搜索组件配置
  searchConfig = getSearchConfig(options)
  // 表格配置
  columns = getColumnsConfig(options)

  // api配置
  let config = {
    apiName: '内部信息交流相关接口',
    apis: []
  }
  let filePath = resolvePath(
    `./server/template/${getTypeTxt(options.type)}/api/index.js`
  )
  options.apiconfig.domains.forEach((item) => {
    let obj = {
      name: item.list[0].value,
      method: item.list[2].method,
      methodName: item.list[1].value,
      url: `${item.list[2].value}`
    }
    config.apis.push(obj)
  })

  // 存到全局 createList需要用到
  apis = config.apis

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

function createList(options) {
  // api配置
  let config = {
    apis,
    deleteTip: '确定删除该案例吗？',
    createApiName: 'addData',
    getDataApiName: 'getData',
    updateApiName: 'update',
    delateApiName: 'delateData',
    getDetailsApiName: 'getDetails',
    exportUrl: '/city-platform/bizCsDzwl/exportList',
    exportFeilName: '电子围栏',
    suffix: '.xlsx'
  }

  let filePath = resolvePath(
    `./server/template/${getTypeTxt(options.type)}/index.vue`
  )

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

function createConfig(options) {
  // 获取所有字典
  let dicts = getDicts(searchConfig, columns)
  // api配置
  let config = {
    searchConfig,
    columns,
    dicts
  }
  let filePath = resolvePath(
    `./server/template/${getTypeTxt(options.type)}/config.js`
  )

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

function createAction(options) {
  // 获取所有字典
  let dicts = getDicts(searchConfig, columns)
  // 详情配置
  let config = {
    apis,
    dicts,
    createApiName: 'addData',
    getDataApiName: 'getData',
    updateApiName: 'update',
    delateApiName: 'delateData',
    getDetailsApiName: 'getDetails'
  }

  let filePath = resolvePath(
    `./server/template/${getTypeTxt(options.type)}/action/index.vue`
  )

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

// 获取类型名称
function getTypeTxt(type) {
  let typeTxtMap = {
    1: 'single',
    2: 'tabs'
  }
  return typeTxtMap[type]
}

// 获取搜索组件配置
function getSearchConfig(options) {
  let list = []
  options.queryColumn.forEach((item) => {
    let obj = {}
    if (isTrue(item.isQuery) || isTrue(item.isExtraQuery)) {
      obj.type = item.queryType
      obj.prop = item.columnName
      obj.label = item.label

      if (item.dict) {
        obj.dict = item.dict
      }

      if (item.options) {
        obj.options = item.options
      }

      obj.show = !item.isExtraQuery // 隐藏的参数，不在搜索组件中显示
      list.push(obj)
    }
  })
  return list
}
// 获取表头配置
function getColumnsConfig(options) {
  let list = [{ type: 'index', label: '序号' }]
  options.listColumn.forEach((item) => {
    let obj = {}
    if (isTrue(item.isList)) {
      obj.prop = item.columnName
      obj.label = item.label

      if (item.dict) {
        obj.dict = item.dict
      }

      if (item.slot) {
        obj.slot = item.slot
      }
      list.push(obj)
    }
  })
  list.push({ slot: 'action' })
  return list
}
// 注册 Handlebars 的 helper 函数
function registerHelper() {
  // 注册 Handlebars 的 helper 函数 eq，用于判断相等
  Handlebars.registerHelper('eq', function (a, b) {
    return a == b
  })
  Handlebars.registerHelper('isHas', function (a) {
    return Boolean(a)
  })
  Handlebars.registerHelper('getParmas', function (type) {
    if (['get'].includes(type)) {
      return 'params'
    } else {
      return 'data'
    }
  })
}

// 获取所有字典
function getDicts(searchConfig, columns) {
  let dict = []
  let list = [...searchConfig, ...columns]
  list.forEach((item) => {
    if (item.dict && !dict.includes(item.dict)) {
      dict.push(item.dict)
    }
  })
  return dict
}

function isTrue(type) {
  return type == true && type == 1
}
