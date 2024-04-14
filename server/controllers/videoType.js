import SQLiteDB from '../sqlite/index.js';

// 创建数据库连接
const db = new SQLiteDB('shadiao.db');
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' }
];
db.createTable('videoTypes', columns);

export default class appController {
    /**
     * 新增视频类型接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static addVideoType(ctx) {
        let params = ctx.request.body;
        // 插入数据
        const data = { ...params };
        db.insertData('videoTypes', data);
        ctx.body = {
            code: 200,
            data: null,
            msg: 'ok'
        };
    }
    /**
     * 获取视频类型接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getVideoType(ctx) {
        const { page = 1, pageSize = 10 } = ctx.request.query;
        const querys = { ...ctx.request.query };
        delete querys.page;
        delete querys.pageSize;
        let condition = "";
        console.log('querys:', querys)
        for (const key in querys) {
            condition+= ` ${key} = ${querys[key]} AND`;
        }

        let lastIndex = condition.lastIndexOf("AND");
        if (lastIndex !== -1) {
            condition = condition.substring(0, lastIndex).trim();
        }
        console.log('getVideoType:', condition)
        let { data, total, totalPages } = await db.getPagedData("videoTypes", page, pageSize, condition)
        // console.log(data); // 处理分页查询结果
        // console.log(total); // 总数
        // console.log(totalPages); // 总页数

        for (const item of data) {
            let res = await db.getPagedData("videos", page, pageSize, `videoTypeid = ${item.id}`)
            item.list = res.data;
            item.list.forEach(element => {
                element.confs = JSON.parse(element.confs);
                element.speaks = JSON.parse(element.speaks);
            });
        }
        
        ctx.body = {
            code: 200,
            data: {
                data,
                total,
                totalPages
            },
            msg: 'ok'
        }
    }
    /**
     * 删除视频类型接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async deleteVideoType(ctx) {
        let params = ctx.request.body;
        // 删除数据
        const deleteCondition = `id = ${params.id}`;
        let res = await db.deleteData('videoTypes', deleteCondition);
        ctx.body = {
            code: 200,
            data: res,
            msg: 'ok'
        };
    }
}