import SQLiteDB from '../sqlite/index.js'
import { createCode, writeFile } from './Handlebars.js'
import { getCondition } from '../utils/index.js'

// 创建数据库连接
const db = new SQLiteDB('aotuCode.db')
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' }, // 名称
  { name: 'desc', type: 'TEXT' }, // 描述
  { name: 'code', type: 'TEXT' }, // 代码
  { name: 'status', type: 'TEXT' } // 1 可以 0 不可以
]
db.createTable('codes', columns)

export default class appController {
  /**
   * 预览代码
   * @param {Object} ctx - 上下文对象
   */
  static async previewCode(ctx) {
    // 获取请求体参数
    let params = ctx.request.body
    // 使用对象扩展运算符复制参数对象
    const query = { ...params }
    // 根据id查询配置项
    
    let { data, total, totalPages } = await queryItems({ mid: query.id })

    if (query.isWrite) {
      data.forEach((item, index) => {
        // 将配置项写入文件
        if (data.length == 1) {
          writeFile(item)
        } else {
          writeFile(item, index+1)
        }
        
      });
      
      // 返回成功响应
      ctx.body = {
        code: 200,
        data: null,
        msg: `代码已生成在${query.path}}/${query.moduleName}目录下`
      }
    } else {
      let tabConfig = []
      data.forEach(item=>{
        tabConfig.push({
          tabName: item.tabName,
          tabId: item.tabId,
          name: item.name
        })
      })
      // 生成代码
      let codes = data.map((item, index) => {
        item.tabConfig = tabConfig
        console.log('itemtype:', item.type)
        return {
          tabId: item.tabId,
          tabName: item.tabName,
          name: item.name,
          type: item.type,
          code: createCode(item, index+1)
        }
      });
      // 返回成功响应
      ctx.body = {
        code: 200,
        data: codes,
        msg: 'ok'
      }
    }
  }

  /**
   * 保存接口
   * @param {Context} ctx
   * @memberof rustController
   */
  static async addItem(ctx) {
    let params = ctx.request.body
    // 插入数据
    const data = { ...params }
    db.insertData('codes', data)
    ctx.body = {
      code: 200,
      data: {},
      msg: 'ok'
    }
  }

  /**
   * 更新接口
   * @param {Context} ctx
   * @memberof rustController
   */
  static updateItemDetails(ctx) {
    let { id } = ctx.request.body
    let querys = ctx.request.body
    delete querys.id
    // 更新数据
    let condition = `id = ${id}`
    db.updateData('codeConfs', querys, condition)
    ctx.body = {
      code: 200,
      data: null,
      msg: 'ok'
    }
  }
  /**
   * 获取列表
   * @param {*} param
   */
  static async getItem(ctx) {
    const { page = 1, pageSize = 10 } = ctx.request.query
    const querys = { ...ctx.request.query }
    delete querys.page
    delete querys.pageSize
    let condition = ''
    for (const key in querys) {
      condition += ` ${key} = ${querys[key]} AND`
    }

    let lastIndex = condition.lastIndexOf('AND')
    if (lastIndex !== -1) {
      condition = condition.substring(0, lastIndex).trim()
    }
    let { data, total, totalPages } = await db.getPagedData(
      'codeConfs',
      page,
      pageSize,
      condition
    )
    // console.log(data, total, totalPages)
    let result = {
      code: 200,
      data: {
        data,
        total,
        totalPages
      },
      msg: 'ok'
    }
    ctx.body = result
  }

  /**
   * 删除列表数据
   * @param {Context} ctx
   * @memberof rustController
   */
  static async deleteSchema(ctx) {
    let params = ctx.request.body
    // 删除数据
    const deleteCondition = `id = ${params.id}`
    let res = await db.deleteData('codeConfs', deleteCondition)
    ctx.body = {
      code: 200,
      data: res,
      msg: 'ok'
    }
  }
}

/**
 * 通过条件查询数据
 * @param {*} param
 * @returns []
 */
async function queryItems(params) {
  const { page = 1, pageSize = 10 } = params
  let condition = getCondition(params)
  return await db.getPagedData('codeConfs', page, pageSize, condition)
}

/**
 * 获取详情
 * @param {*} param
 */
async function getconfDetailById(ctx) {
  // console.log('ctx:', ctx)
  const { page = 1, pageSize = 10 } = ctx.request.query
  const querys = { ...ctx.request.query }
  delete querys.page
  delete querys.pageSize
  let condition = ''
  for (const key in querys) {
    condition += ` ${key} = ${querys[key]} AND`
  }

  let lastIndex = condition.lastIndexOf('AND')
  if (lastIndex !== -1) {
    condition = condition.substring(0, lastIndex).trim()
  }
  let { data, total, totalPages } = await db.getPagedData(
    'codeConfs',
    page,
    pageSize,
    condition
  )
  // console.log(data.length)
  // console.log(data, total, totalPages)

  let config = data.length ? data[0] : null
  return config

  // let result = {
  //   code: 200,
  //   data: data.length ? data[0] : null,
  //   msg: 'ok'
  // }
  // ctx.body = result
}
