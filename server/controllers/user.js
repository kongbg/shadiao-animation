import SQLiteDB from '../sqlite/index.js';

// 创建数据库连接
const db = new SQLiteDB('shadiao.db');
// 创建表
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
];
db.createTable('users', columns);

export default class appController {
    
}