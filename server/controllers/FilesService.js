import path from 'path'
import fs from 'fs'
import SQLiteDB from '../sqlite/index.js';
const __dirname = path.resolve();
let publicPath = `/server/public`;
let staticPath = path.join(__dirname, publicPath);
// 创建数据库连接
const fileDB = new SQLiteDB('files.db');


// 唯一id
export function generateUniqueID() {
    let uniqueID = Math.floor(Math.random() * Date.now()).toString(36);
    return uniqueID;
}
// 获取扩展名
export function getExtname (fullpath) {
  const root = fullpath.split(/[\\/]/).pop();
  const pos = root.lastIndexOf(".");
  return root === "" || pos < 1 ? "" : root.slice(pos + 1);
};
export default class FilesService {
    static async uploadAsync(file) {
        let uploadPath = path.join(staticPath, `/uploads/audio`);
        return new Promise((resolve, reject) => { //异常上传,同步获取
            const { name, size, type } = file;

            const regex = /^([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([\d.]+)\.(\w+)$/;
            const match = name.match(regex);
            

            let data = {
                cid: match[1],
                confid: match[2],
                duration: match[3] || 0,
                aliasName: name,
                url: `http://127.0.0.1:3009/uploads/audio/${name}`,
                type: ['wav'].includes(match[4]) ? 'audio' : ''
            };

            const reader = fs.createReadStream(file.path); //创建可读文件流
            const fileSavePath = path.join(uploadPath, name); //合成路径 + 时间 + 文件名
            reader.pipe(fs.createWriteStream(fileSavePath)); //写入文件
            reader.on('end', () => {
                reader.close(); //关闭文件
                // fs.unlink(file.path, (err) => { //上传成功后删除临时文件
                //     if (err) {
                //         reject(new Error('删除临时文件异常！'));
                //     } else {
                //         console.log(`文件: ${file.path} 删除成功！`);
                //     }
                // });
                // console.log(`文件:${name} 上传成功!`);
                resolve(data);
            });
            reader.on('error', (err) => { reject(err); });
        })

        function getYearMonthDay() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // 月份从0开始，需要加1
            const day = now.getDate();
            
            return `${year}${month}${day}`;
        }
    }

    /**
     * 多文件上传
     * @param {*} param0
     */
    static async uploadFiles({ state, files }) {
        return new Promise(async resolve => {

        
            if (!files.file) {
                return resolve([{ message: '未发现上传文件' },null]);
            }
            //兼容单文件上传
            const fileList = Array.isArray(files.file) ? files.file : [files.file];
            try {
                let pathNames = {
                    '1': 'images',
                    '2': 'audio',
                    '3': 'video',
                }
                let pathName = `${pathNames[state.type]}/${state.purpose}`;
                //创建文件夹
                let uploadPath = path.join(staticPath, `/uploads/`, pathName); //文件上传存放路径
                const existsSync = await new Promise((resolve, reject) => {
                    if (!fs.existsSync(uploadPath)) { //判断文件夹是否存在
                        fs.mkdir(uploadPath, (err) => {
                            if (err) {
                                reject(new Error(err));
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                });
                if (existsSync) { //确认成功之后再进行操作
                    //多文件上传
                    const saveFiles = await Promise.all(fileList.map((file) => {
                        return this.__filePromise(file, uploadPath, state);
                    }));
                    //保存文件到数据库
                    saveFiles.forEach(data => {
                        fileDB.insertData('files', data);
                    })
                    
                    return resolve([null, saveFiles])
                }
                return resolve([{ message: '上传文件异常' },null]);
            } catch (error) {
                console.log(error);
                return resolve([{ message: '上传文件出错' },null]);
            }
        })
    }
    /**
     * 异步上传文件
     * @param {*} file
     */
    static async __filePromise (file, uploadPath, { type, userId, userName, purpose }) {
        return new Promise((resolve, reject) => { //异常上传,同步获取
            const { name, size } = file;
            //创建数据库存储数据
            const data = {
                userId, //上传者id
                userName, //上传者名称
                fileId: generateUniqueID(),
                size, //文件大小
                type, //文件类型
                fileType: file.type, //文件类型
                purpose, // 用途
                fileName: name, //获取原文件名
                suffix: getExtname(name), //获取文件后缀名
                path: null, //文件路径
                aliasName: null, //文件别名
                remark: null, //源文件路径
                status: '1'
            };
            try {
                const reader = fs.createReadStream(file.path); //创建可读文件流
                const fileName = `${data.fileId}.${data.suffix}`; //重名名后的文件
                const fileSavePath = path.join(uploadPath, fileName); //合成路径 + 时间 + 文件名
                
                data.path = `/uploads/images/${ purpose ? purpose+'/' : '' }${fileName}`; //存储完整路径
                data.aliasName = name; //存储别名
                reader.pipe(fs.createWriteStream(fileSavePath)); //写入文件
                reader.on('end', () => {
                    reader.close(); //关闭文件
                    // fs.unlink(file.path, (err) => { //上传成功后删除临时文件
                    //     if (err) {
                    //         reject(new Error('删除临时文件异常！'));
                    //     } else {
                    //         console.log(`文件: ${file.path} 删除成功！`);
                    //     }
                    // });
                    console.log(`文件:${name} 上传成功!`);
                    resolve(data);
                });
                reader.on('error', (err) => { reject(err); });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}