import SQLiteDB from '../sqlite/index.js';
import FilesService from './FilesService.js'

// 创建数据库连接
const db = new SQLiteDB('files.db');
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'type', type: 'TEXT' }, // 1 图片 2 音频 3 视频
  { name: 'fileType', type: 'TEXT' }, // 图片 音频 视频
  { name: 'purpose', type: 'TEXT' }, // 用途类型
  { name: 'userId', type: 'TEXT' }, //上传者id
  { name: 'userName', type: 'TEXT' }, //上传者名称
  { name: 'fileId', type: 'TEXT' }, // 文件id
  { name: 'fileName', type: 'TEXT' }, // 文件名
  { name: 'suffix', type: 'TEXT' }, // 后缀名
  { name: 'aliasName', type: 'TEXT' }, // 别名
  { name: 'remark', type: 'TEXT' }, // 备注
  { name: 'size', type: 'TEXT' }, // 大小
  { name: 'duration', type: 'INTEGER' },// 音频，视频时长
  { name: 'status', type: 'TEXT' }, // 1 可以 0 不可以
  { name: 'path', type: 'TEXT' }, // 相对路径
];
db.createTable('files', columns);

export default class appController {
    /**
     * 上传接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async upload(ctx) {
        let files = ctx.request.files;
        // console.log('files:',files)
        // 额外的参数，需要使用ctx.request.body获取
	    const { type, duration, userId, userName, purpose } = ctx.request.body;
        // console.log('额外的参数:', type, duration, userId, userName);
        let params = {
            state: {
                type,
                duration,
                userId,
                userName, 
                purpose
            },
            files
        }
        let res = await FilesService.uploadFiles(params);
        ctx.body = {
            code: 200,
            data: {
                
            },
            msg: 'ok'
        };
    }
    /**
     * 获取文件列表
     * @param {*} param0
     */
    static async getFiles(ctx) {
        // console.log('getFiles:', ctx.request.query)
        let { page, pageSize, type, purpose } = ctx.request.query;
        let condition = `type = '${type}' AND purpose = '${purpose}'`
        let { data, total, totalPages } = await db.getPagedData("files", page, pageSize, condition)
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
        ctx.body = result;

    }
}