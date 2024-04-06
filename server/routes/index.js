import Router from 'koa-router'
import audioController from '../controllers/audio.js'
import videoTypeController from '../controllers/videoType.js'
import videoController from '../controllers/video.js'
import fileController from '../controllers/file.js'
import userController from '../controllers/user.js'
const routerInit = new Router({ prefix: '/api' })

// 音频相关
routerInit.post('/saveAudios', audioController.saveAudios)
routerInit.get('/getAudios', audioController.getAudios)
routerInit.get('/getAudiosConf', audioController.getAudiosConf)
routerInit.post('/upload', audioController.upload)

// 视频分类相关
routerInit.post('/addVideoType', videoTypeController.addVideoType)
routerInit.get('/getVideoType', videoTypeController.getVideoType)
routerInit.post('/deleteVideoType', videoTypeController.deleteVideoType)

// 视频相关
routerInit.post('/addVideo', videoController.addVideo)
routerInit.post('/updateVideo', videoController.updateVideo)
routerInit.post('/deleteVideo', videoController.deleteVideo)
routerInit.post('/exportVideo', videoController.exportVideos)

// 通用上传
routerInit.post('/uploadV2', fileController.upload)
routerInit.get('/getFiles', fileController.getFiles)


// 若依
// 获取登录验证码
routerInit.get('/captchaImage', (ctx)=>{
    let result = {
        code: 200,
        data: {},
        msg: 'ok'
    }
    ctx.body = result;
})


export default routerInit