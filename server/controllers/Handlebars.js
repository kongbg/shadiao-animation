import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
function resolvePath(filePath) {
  return path.resolve(__dirname, filePath)
}

/** 全局变量 */ 
// 写入api.js接口
let apis = []
// config中需要引入的api
let configApis = []
// 搜索组件配置
let searchConfig = []
// 表格配置
let columns = []

// 注册 Handlebars 的 helper 函数
registerHelper()

// 写入内容到本地文件
export const writeFile = (options, index=undefined) => {
  // console.log('写入内容到本地文件:', options)
  console.log('写入内容到本地文件:', index)
  let code = createCode(options, index)
  let tempCode = JSON.parse(code)
  let {path, apiFolder, pageFolder, moduleName} = options

  for (const key in tempCode) {
    let distPath = ''
    if (key == 'api') {
      distPath = resolvePath(`${path?path+'/':''}${apiFolder?apiFolder+'/':''}index${index!=undefined?index:''}.js`)
      console.log('distPath:', distPath)
      // createFile(distPath, tempCode[key])
    }
    if (key == 'list') {
      distPath = resolvePath(`${path?path+'/':''}${pageFolder?pageFolder+'/':''}index.vue`)
      console.log('distPath:', distPath)
      // createFile(distPath, tempCode[key])
    }
    if (key == 'config') {
      distPath = resolvePath(`${path?path+'/':''}${pageFolder?pageFolder+'/':''}config${index!=undefined?index:''}.js`)
      console.log('distPath:', distPath)
      // createFile(distPath, tempCode[key])
    }
    if (key == 'action') {
      distPath = resolvePath(`${path?path+'/':''}${pageFolder?pageFolder+'/':''}action/index${index!=undefined?index:''}.vue`)
      console.log('distPath:', distPath)
      // createFile(distPath, tempCode[key])
    }
  }
}

// 通过配置创建文件
export const createCode = (options, index=undefined) => {
  // api 配置
  options.apiconfig = JSON.parse(options.apiconfig || JSON.stringify({}))
  // 搜索组件配置
  options.queryColumn = JSON.parse(options.queryColumn || [])
  // 列表页表格配置
  options.listColumn = JSON.parse(options.listColumn || [])
  // 列表页按钮，接口配置
  options.listActions = JSON.parse(options.listActions || [])
  // 新增接口参数配置
  options.addColumn = JSON.parse(options.addColumn || [])
  // 编辑接口参数配置
  options.editColumn = JSON.parse(options.editColumn || [])
  // 编辑页面按钮，接口配置
  options.editActions = JSON.parse(options.editActions || [])

  // 存储各个类型文件代码
  let code = {}
  // 构成每种模板的配置
  let configs = []
  if (options.type == 1) {
    // 列表-搜索-详情：基本的增删查改
    configs = ['api', 'list', 'action', 'config']
    // 生成各种类型的代码
    configs.forEach((conf) => {
      switch (conf) {
        case 'list':
          // 列表页
          code[conf] = createList(options)
          break
        case 'api':
          // api文件
          code[conf] = createApi(options)
          break
        case 'config':
          // config.js 配置文件
          code[conf] = createConfig(options)
          break
        case 'action':
          // 详情页
          code[conf] = createAction(options)
          break
      }
    })
  } else {// 含tabs 的模板
    // 列表-搜索-详情：基本的增删查改
    configs = ['api', 'list', 'action', 'config']
    // 生成各种类型的代码
    options.type = 2
    configs.forEach((conf) => {
      switch (conf) {
        case 'list':
          // 列表页
          code[conf] = createList(options, index)
          break
        case 'api':
          // api文件
          code[conf] = createApi(options)
          break
        case 'config':
          // config.js 配置文件
          code[conf] = createConfig(options)
          break
        case 'action':
          // 详情页
          code[conf] = createAction(options, index)
          break
      }
    })
  }

  
  return JSON.stringify(code)
}

// 生成api文件
function createApi(options) {
  // 搜索组件配置
  searchConfig = getSearchConfig(options)
  // 表格配置
  columns = getColumnsConfig(options)

  // api配置
  let config = {
    // api文件名称
    apiModuleName: options.apiconfig.apiModuleName,
    // 列表页，详情页所有接口
    apis: [],
    // config.js 文件中的接口
    configApis: []
  }
  // 模板路径 两种类型模板api 公用一个模板
  let filePath = resolvePath(
    `./server/template/single/api/index.js`
  )
  // let filePath = resolvePath(
  //   `./server/template/${getTypeTxt(options.type)}/api/index.js`
  // )
  // 将页面配置转化成能生成接口的配置
  options.apiconfig.domains.forEach((item) => {
    let obj = {
      name: item.list[0].value,
      method: item.list[2].method,
      methodName: item.list[1].value,
      url: `${item.list[2].value}`
    }
    config.apis.push(obj)
  })

  // 从搜索配置中找到数据来源设置中需要用的的接口，将来需要在config.js中引入
  options.queryColumn.forEach(item=>{
    if (item?.dataSource?.sourceType == 2) {
      let obj = {
        name: item.dataSource.name,
        method: item.dataSource.method,
        methodName: item.dataSource.apiName,
        url: item.dataSource.apiUrl
      }
      config.configApis.push(obj)
    }
  })

  // 存到全局 createList需要用到
  apis = config.apis
  configApis = config.configApis

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

// 生成列表页代码
function createList(options, index=undefined) {
  // 列表页按钮，接口配置
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
    index,
    codePath: options.codePath,
    path: options.path,
    actions,
    tabConfig: options.tabConfig,
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
  // console.log('生成列表页代码：', config)
  // 模板路径
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

// 生成config.js
function createConfig(options) {
  // 获取所有字典
  let dicts = getDicts(searchConfig, columns)
  // api配置
  let config = {
    searchConfig,
    columns,
    dicts,
    moduleName: options.moduleName,
    codePath: options.codePath,
    path: options.path,
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

// 生成详情页
function createAction(options, index=undefined) {
  // 获取所有提交参数，并设置默认值
  let submitParams = getSubmitParams(options)

  let actions = {}
  options.editActions.forEach(item=>{
    actions[item.key] = {}
    item.list.forEach(info => {
      actions[item.key][info.prop] = info.value
    })
  })
  // 详情配置
  let config = {
    apis,
    moduleName: options.moduleName,
    index,
    codePath: options.codePath,
    path: options.path,
    submitParams,
    actions,
    // actions: {
    //   // 新增
    //   create: {
    //     show: true,
    //     apiName: 'createData',
    //     btnTxt: '新增',
    //     openType: '1', // 1-跳转，2-弹窗
    //     openUrl: 'index' // 跳转地址
    //   },
    //   // 编辑
    //   edit: {
    //     show: true,
    //     apiName: 'updateData',
    //     btnTxt: '编辑',
    //     openType: '1', // 1-跳转，2-弹窗
    //     openUrl: 'index' // 跳转地址
    //   },
    //   // 查看
    //   view: {
    //     show: true,
    //     apiName: 'getDetails',
    //     btnTxt: '查看',
    //     openType: '1', // 1-跳转，2-弹窗
    //     openUrl: 'index' // 跳转地址
    //   }
    // },
  }

  // 模板路径 两种类型模板action 公用一个模板
  let filePath = resolvePath(
    `./server/template/single/action/index.vue`
  )
  // let filePath = resolvePath(
  //   `./server/template/${getTypeTxt(options.type)}/action/index.vue`
  // )

  // 读取模板
  const templateContent = fs.readFileSync(filePath, 'utf8')
  const template = Handlebars.compile(templateContent)
  // 生成文件
  const vueContent = template(config)

  return vueContent
}

// 获取新增，编辑的参数
function getSubmitParams(options) {
  let list = []
  options.editColumn.forEach(item => {
    // 一般情况下。新增跟编辑是一样的参数
    if (isTrue(item.isEdit)) {
      let obj = {
        prop: item.columnName,
        label: item.columnComment,
        // type: getJavaType(item.javaType)
        type: item.editZDType,
        value: `''`,
        disabled: item.disabled
      }

      if(['select', 'areacascader'].includes(item.editZDType)) {
        obj.value = `[]`
        obj.options = `[]`// todo 根据数据来源去配置
        obj.props = `''`
      }

      list.push(obj)
    }
  })
  return list
}

// 获取数据类型
function getJavaType(javaType) {
  if (typeof javaType == 'string' ) {
    return javaType
  }
  if (Array.isArray(javaType) && javaType.length) {
    return javaType[0]
  }
  return ''
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

      // 数据来源为字典
      if (item?.dataSource?.sourceType == '1') {
        obj.dict = item.dataSource.dict
        obj.api = ''
      }
      // 数据；来源为接口 todo 配置成功回调
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
      // todo 手动录入下拉框数据

      if (item.options) {
        obj.options = item.options
      }

      // 隐藏参数，不在提交表单中显示，单提交时需要
      obj.show = !item.isExtraQuery // 隐藏的参数，不在搜索组件中显示
      list.push(obj)
    }
  })
  return list
}

// 获取表头配置
function getColumnsConfig(options) {
  // 默认都有序号列
  let list = [{ type: 'index', label: '序号' }]
  options.listColumn.forEach((item) => {
    let obj = {}
    if (isTrue(item.isList)) {
      // 列字段
      obj.prop = item.columnName
      // 表头文案
      obj.label = item.label

      //字典
      if (item.dict) {
        obj.dict = item.dict
      }

      //插槽
      if (item.slot) {
        obj.slot = item.slot
      }
      list.push(obj)
    }
  })
  // 默认有操作列
  list.push({ slot: 'action' })
  return list
}

// 注册 Handlebars 的 helper 函数
function registerHelper() {
  // 注册 Handlebars 的 helper 函数 eq，用于判断相等
  Handlebars.registerHelper('eq', function (a, b) {
    return a == b
  })
  // 判断两参数都是true
  Handlebars.registerHelper('and2', function (a, b) {
    return a && b
  })
  // 判断是否存在
  Handlebars.registerHelper('isHas', function (a) {
    return Boolean(a)
  })
  // 出来接口参数格式问题
  Handlebars.registerHelper('getParmas', function (type) {
    if (['get'].includes(type)) {
      return 'params'
    } else {
      return 'data'
    }
  })
  // 循环时下标从加1 开始
  Handlebars.registerHelper('indexPlusOne', function (index) {
    return index + 1
  })
}

// 获取所有字典
function getDicts(searchConfig, columns) {
  let dict = []
  let list = [...searchConfig, ...columns]
  list.forEach((item) => {
    // 配置了字典，且数据类型是下拉或者级联的才去请求接口
    if (item.dict && !dict.includes(item.dict)) {
      dict.push(item.dict)
    }

    function needGetApi(item) {
      if(['select', 'areacascader'].includes(item.queryType) || ['select', 'areacascader'].includes(item.editZDType)) {
        return true
      } else {
        return false
      }
    }
  })
  return dict
}

// 为了避免 字符串为true的问题
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