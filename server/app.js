import Koa  from 'koa';
// import bodyparser from 'koa-bodyparser' 
import koaBody from "koa-body";
import koaStatic from 'koa-static'
import path from 'path'
import Cors from '@koa/cors'
// import { exportVideo } from './WebVideoCreator2.js';
import appRouter from './routes/index.js'
const app = new Koa();

app.use(Cors())
const __dirname = path.resolve();
app.use(koaStatic(path.join(__dirname + "/server/public")));
// app.use(bodyparser())
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 10 * 1024 * 1024, // 最大长度
        // uploadDir: path.join(__dirname, "../public"), //这里是你的存放文件的文件夹
        keepExtensions: true, //是否保留扩展名
        multiples: true //是否多选
    }
}));

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// router.get('/exportVideo', async (ctx) => {
//     console.log('exportVideo')
//     await exportVideo();
//     ctx.body = {
//         code: 200,
//         data: {},
//         msg: '视频生成成功！'
//     }
// })

app.use(appRouter.routes()).use(appRouter.allowedMethods())
app.listen(3006, ()=>{
    console.log('koa is running in port: 3006')
});