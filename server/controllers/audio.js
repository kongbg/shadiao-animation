import SQLiteDB from '../sqlite/index.js';
import FilesService from './FilesService.js'

// 创建数据库连接
const db = new SQLiteDB('shadiao.db');
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'mid', type: 'TEXT' },
  { name: 'name', type: 'TEXT' },
  { name: 'blob', type: 'BLOB' },
  { name: 'duration', type: 'INTEGER' },
  { name: 'audioUrl', type: 'TEXT' },
];
db.createTable('audios', columns);

const fcolumns = [
    { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
    { name: 'cid', type: 'TEXT' },
    { name: 'confid', type: 'TEXT' },
    { name: 'type', type: 'INTEGER' },
    { name: 'url', type: 'TEXT' },
    { name: 'duration', type: 'TEXT' },
    { name: 'aliasName', type: 'TEXT' },
  ];
db.createTable('files', fcolumns);

export default class appController {
    /**
     * 保存音频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async saveAudios(ctx) {
        console.log('ctx.request:', ctx.request.files)
        let params = ctx.request.body;
        // 插入数据
        const data = { ...params };
        // db.insertData('audios', data);
        ctx.body = {
            code: 200,
            data: {},
            msg: 'ok'
        };
    }
    /**
     * 获取音频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getAudios(ctx) {
        const page = 1;
        const pageSize = 10;
        const condition = "mid = 'k0j3pse'";
        let { data, total, totalPages } = await db.getPagedData("audios", page, pageSize, condition)
        console.log(data); // 处理分页查询结果
        console.log(total); // 总数
        console.log(totalPages); // 总页数
        db.closeConnection(); // 关闭数据库连接
        
        let result = {
            code: 200,
            data: {
                data,
                total,
                totalPages
            },
            msg: 'ok'
        }
        ctx.body = result;
    }
    /**
     * 上传音频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async upload(ctx) {
        // console.log('上传音频接口:', ctx.request.files)
        let file = ctx.request.files.file;
        let res = await FilesService.uploadAsync(file);
        // 额外的参数，需要使用ctx.request.body获取
	    const { data1, data2 } = ctx.request.body;
        console.log('额外的参数:', data1);
        console.log('额外的参数:', data2);

        const deleteCondition = `cid = '${res.cid}'`;
        await db.deleteData('files', deleteCondition);
        // 插入数据
        db.insertData('files', res);
        ctx.body = {
            code: 200,
            data: {
                ...res
            },
            msg: 'ok'
        };
    }

    /**
     * 获取音频地址，时间信息接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getAudiosConf(ctx) {
        let params = ctx.request.query;
        // 插入数据
        let condition = `confid = '${params.confid}'`
        let [err, res] = await db.getData('files', condition);
        ctx.body = {
            code: 200,
            data: {
                data: res
            },
            msg: 'ok'
        };
    }
    
}