import SQLiteDB from '../sqlite/index.js'

// 创建数据库连接
const db = new SQLiteDB('aotuCode.db')
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' }, // 名称
  { name: 'desc', type: 'TEXT' }, // 描述
  { name: 'listColumn', type: 'TEXT' }, // 列表字段配置
  { name: 'queryColumn', type: 'TEXT' }, // 查询字段配置
  { name: 'addColumn', type: 'TEXT' }, //新增字段配置
  { name: 'editColumn', type: 'TEXT' }, //编辑字段配置
  { name: 'detailColumn', type: 'TEXT' }, // 详情字段配置
  { name: 'apiconfig', type: 'TEXT' }, // api配置
  { name: 'status', type: 'TEXT' } // 1 可以 0 不可以
]
db.createTable('codeConfs', columns)

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
    db.insertData('codeConfs', data)
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
   * 获取详情
   * @param {*} param
   */
  static async getItemDetails(ctx) {
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
      data: data.length ? data[0] : null,
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
