import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
function resolvePath(filePath) {
  return path.resolve(__dirname, filePath)
}

let apis = []
// config中需要引入的api
let configApis = []
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
    },
    {
      list: [
        {
          label: '功能名称',
          value: '导出',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'exportData',
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

export const writeFile = (options) => {
  let code = createCode(options)
  let tempCode = JSON.parse(code)
  for (const key in tempCode) {
    let distPath = ''
    if (key == 'api') {
      distPath = resolvePath(`src/api/${options.moduleName}/index.js`)
      createFile(distPath, tempCode[key])
    }
    if (key == 'list') {
      distPath = resolvePath(`src/views/${options.path}/index.vue`)
      createFile(distPath, tempCode[key])
    }
    if (key == 'config') {
      distPath = resolvePath(`src/views/${options.path}/config.js`)
      createFile(distPath, tempCode[key])
    }
    if (key == 'action') {
      distPath = resolvePath(`src/views/${options.path}/action/index.vue`)
      createFile(distPath, tempCode[key])
    }
  }
}
export const createCode = (options) => {
  options.apiconfig = JSON.parse(options.apiconfig || JSON.stringify(domains))
  options.queryColumn = JSON.parse(options.queryColumn || [])
  options.listColumn = JSON.parse(options.listColumn || [])
  options.listActions = JSON.parse(options.listActions || [])
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
    apiModuleName: options.apiconfig.apiModuleName,
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

  options.queryColumn.forEach(item=>{
    if (item?.dataSource?.sourceType == 2) {
      let obj = {
        name: item.dataSource.name,
        method: item.dataSource.method,
        methodName: item.dataSource.apiName,
        url: item.dataSource.apiUrl
      }
      config.apis.push(obj)
      configApis.push(obj)
    }
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
  let actions = {}
  options.listActions.forEach(item=>{
    actions[item.key] = {}
    item.list.forEach(info => {
      actions[item.key][info.prop] = info.value
    })
  })
  // api配置
  let config = {
    apis,
    moduleName: options.moduleName,
    actions,
    // actions: {
    //   // 新增
    //   create: {
    //     show: true,
    //     apiName: 'addData',
    //     btnTxt: '新增',
    //     openType: '1' // 1-跳转详情，2-弹窗
    //   },
    //   // 导出
    //   export: {
    //     show: true,
    //     apiName: 'exportData',
    //     btnTxt: '导出',
    //     feilName: '导出文件名',
    //     suffix: '.xlsx'
    //   },
    //   // 编辑
    //   edit: {
    //     show: true,
    //     apiName: 'update',
    //     btnTxt: '编辑',
    //     openType: '1' // 1-跳转详情，2-弹窗
    //   },
    //   // 查看
    //   view: {
    //     show: true,
    //     apiName: 'update',
    //     btnTxt: '查看',
    //     openType: '1' // 1-跳转详情，2-弹窗
    //   },
    //   // (搜索)获取列表
    //   search: {
    //     apiName: 'getData',
    //   },
    //   // 删除
    //   delete: {
    //     show: true,
    //     apiName: 'deleteData',
    //     btnTxt: '删除',
    //     tips: '确定删除该咨询记录吗？',
    //   }
    // },
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
    dicts,
    moduleName: options.moduleName,
    configApis
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
    delateApiName: 'deleteData',
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
      // console.log('item:', item)
      obj.type = item.queryType
      obj.prop = item.columnName
      obj.label = item.label

      if (item?.dataSource?.sourceType == '1') {
        obj.dict = item.dataSource.dict
        obj.api = ''
      }
      if (item?.dataSource?.sourceType == '2') {
        obj.dict = ''
        obj.api = `async () => {
          let res = await ${item.dataSource.apiName}(${item.dataSource.apiParams});
          let { code, data, msg } = res;
          if (code == 200) {
            return data;
          }
          return [];
        }`

        if(item.dataSource.props) {
          obj.props = item.dataSource.props || ''
        }
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
  Handlebars.registerHelper('and2', function (a, b) {
    return a && b
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

// 补全文件路径
function createFolderPath(filePath) {
  const fileContent = "";

  // 获取文件所在目录的路径
  const directoryPath = path.dirname(filePath);

  // 判断目录是否存在，如果不存在则创建目录
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    // console.log("目录已创建");
  }

  // 判断文件是否存在，如果不存在则创建文件并写入内容
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, fileContent);
    // console.log("文件已创建并写入内容");
  } else {
    // console.log("文件已存在");
  }
}

// 输出文件
function createFile(distPath, content) {
  // 先创建一个空文件，目标为了补全路径
  createFolderPath(distPath);
  fs.writeFileSync(distPath, content);
}