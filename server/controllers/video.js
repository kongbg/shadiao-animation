import SQLiteDB from '../sqlite/index.js';
import { exportVideo } from '../WebVideoCreator2.js';

// 创建数据库连接
const db = new SQLiteDB('shadiao.db');
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' },
  { name: 'content', type: 'TEXT' },
  { name: 'confs', type: 'TEXT' },
  { name: 'videoTypeid', type: 'INTEGER' },
  { name: 'speaks', type: 'TEXT' }
];
db.createTable('videos', columns);

export default class appController {
    /**
     * 新增视频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static addVideo(ctx) {
        let { name, content, confs, speaks, videoTypeid } = ctx.request.body;
        // 插入数据
        const data = { name, content, videoTypeid, confs: JSON.stringify(confs), speaks: JSON.stringify(speaks) };
        db.insertData('videos', data);
        ctx.body = {
            code: 200,
            data: null,
            msg: 'ok'
        };
    }

    /**
     * 更新视频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static updateVideo(ctx) {
        let { id, name, content, confs, speaks, videoTypeid } = ctx.request.body;
        // 更新数据
        let condition = `id = ${id}`
        const data = { name, content, videoTypeid, confs: JSON.stringify(confs), speaks: JSON.stringify(speaks) };
        db.updateData('videos', data, condition);
        ctx.body = {
            code: 200,
            data: null,
            msg: 'ok'
        };
    }
    /**
     * 获取视频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getVideo(ctx) {
        const page = 1;
        const pageSize = 10;
        const condition = "id > 0";
        let { data, total, totalPages } = await db.getPagedData("videos", page, pageSize, condition)
        console.log(data); // 处理分页查询结果
        console.log(total); // 总数
        console.log(totalPages); // 总页数
 
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
     * 删除视频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async deleteVideo(ctx) {
        let params = ctx.request.body;
        // 删除数据
        const deleteCondition = `id = ${params.id}`;
        let res = await db.deleteData('videos', deleteCondition);
        ctx.body = {
            code: 200,
            data: res,
            msg: 'ok'
        };
    }

    /**
     * 导出视频接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async exportVideos(ctx) {
        let params = ctx.request.body;
        // 删除数据
        await exportVideo(params);
        ctx.body = {
            code: 200,
            data: {},
            msg: 'ok'
        };
    }
}