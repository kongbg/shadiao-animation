import Router from 'koa-router'

import autoCodeController from '../controllers/autoCode.js'
import createCodeController from '../controllers/createCode.js'
import moduleController from '../controllers/codeModule.js'
const routerInit = new Router({ prefix: '/api' })


// 低代码相关
routerInit.post('/autocode/config/add', autoCodeController.addItem)
routerInit.get('/autocode/config/get', autoCodeController.getItem)
routerInit.get('/autocode/config/details', autoCodeController.getItemDetails)
routerInit.post('/autocode/config/update', autoCodeController.updateItemDetails)
routerInit.post('/autocode/code/preview', createCodeController.previewCode)

routerInit.post('/autocode/module/add', moduleController.addItem)
routerInit.get('/autocode/module/get', moduleController.getItem)
routerInit.get('/autocode/module/details', moduleController.getItemDetails)
routerInit.post('/autocode/module/update', moduleController.updateItemDetails)
routerInit.post('/autocode/module/delete', moduleController.deleteItem)


// 若依
// 获取登录验证码
routerInit.get('/captchaImage', (ctx) => {
  let result = {
    code: 200,
    data: {},
    msg: 'ok'
  }
  ctx.body = result
})

export default routerInit
