import SQLiteDB from '../sqlite/index.js'
import { createCode } from './Handlebars.js'

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
   * 预览
   * @param {Context} ctx
   * @memberof rustController
   */
  static async previewCode(ctx) {
    let params = ctx.request.body
    // 插入数据
    const data = { ...params }

    // console.log('data:', data)
    let config = await getconfDetailById({
      request: { query: { id: data.id } }
    })
    // console.log('data:', config)
    let code = createCode(config)
    ctx.body = {
      code: 200,
      data: {
        code
      },
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
