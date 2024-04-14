import SQLiteDB from '../sqlite/index.js'
import FilesService from './FilesService.js'

// 创建数据库连接
const db = new SQLiteDB('shadiao.db')
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'purpose', type: 'TEXT' }, // 用途类型
  { name: 'userId', type: 'TEXT' }, //上传者id
  { name: 'userName', type: 'TEXT' }, //上传者名称
  { name: 'name', type: 'TEXT' }, // 文件名
  { name: 'schema', type: 'TEXT' }, // schemas
  { name: 'path', type: 'TEXT' }, // path
  { name: 'status', type: 'TEXT' } // 1 可以 0 不可以
]
db.createTable('schemas', columns)

export default class appController {
  /**
   * 保存接口
   * @param {Context} ctx
   * @memberof rustController
   */
  static async saveSchema(ctx) {
    let params = ctx.request.body
    // 插入数据
    const data = { ...params }
    db.insertData('schemas', data)
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
  static updateSchema(ctx) {
    let { id } = ctx.request.body
    let querys = ctx.request.body
    delete querys.id
    // 更新数据
    let condition = `id = ${id}`
    db.updateData('schemas', querys, condition)
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
  static async getSchema(ctx) {
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
      'schemas',
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
    let res = await db.deleteData('schemas', deleteCondition)
    ctx.body = {
      code: 200,
      data: res,
      msg: 'ok'
    }
  }
}
