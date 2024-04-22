import { Application, Container, Loader, RenderTexture } from 'pixi.js'
import Sprite from './sprite'
import { generateUniqueID } from '../../utils'
import { setTextures, getTextures, getTexturesAll } from './textures'
// 创建舞台
export default class Stage {
  constructor(options = {}) {
    this.id = ''
    this.name = ''
    this.width = 800
    this.height = 600
    this.el = null
    this.backgroundColor = '0x1099bb'

    // 合并参数
    Object.assign(this, options)
    // 初始化
    this.init()
    return this
  }

  // 初始化
  async init() {
    let { width, height, backgroundColor, el, id, name } = this
    // 创建舞台
    this.app = new Application({
      width,
      height,
      backgroundColor,
      antialias: true // 设置抗锯齿属性为 true
    })

    if (el) el.appendChild(this.app.view)

    this.stage = this.app.stage
    this.renderer = this.app.renderer
    this.stage.type = 'stage'
    this.stage.id = id
    this.stage.name = name

    // 开启事件监听
    this.enableAddEventListener()

    // 将this上的事件事件绑定到this.sprite上
    this.bindEvent()

    // 初始化加载器
    this.loader = new Loader()

    // 根据config初始化画布
    await this.initStage()
  }

  // 开启事件监听
  enableAddEventListener() {
    this.el.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    this.el.addEventListener('drop', (event) => {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))
      if (this.drop) {
        let id = generateUniqueID()
        this.drop(id, data.type, {
          x: event.offsetX - data.ox,
          y: event.offsetY - data.ox,
          zIndex: data.zIndex,
          url: data.url
        })
      }
    })
  }
  // 将this上的事件事件绑定到this
  bindEvent() {}
  // 缓存资源
  async cacheResources() {
    // 获取资源url
    let remoteUrl = this.getRemoteUrl()
    // 预加载所有资源
    let resources = await this.loaderResource(remoteUrl)
    // 缓存Textures
    Object.entries(resources).forEach(([key, value]) => {
      setTextures(key, value.texture)
    })
  }
  getRemoteUrl() {
    let urls = []
    this.config.forEach((item) => {
      if (!getTextures(item.id)) {
        let key = item.id
        let url = item.url || ''
        let temp = [key, url]
        urls.push(temp)
      }
    })
    urls = urls.filter((item) => item[1])
    return urls
  }
  // 预加载所有资源
  async loaderResource(urls) {
    const { loader } = this

    return new Promise((resolve, reject) => {
      urls.forEach(([key, value]) => loader.add(key, value, () => {}))
      loader.load((loader, resources) => {
        // console.log('预加载资源完成')
        resolve(resources)
      })
    })
  }
  // 根据config初始化画布
  async initStage() {
    let that = this
    let count = 0
    let leng = this.config.length

    // 缓存资源
    await this.cacheResources()
    debugger

    while (count < leng) {
      let data = this.config[count]
      if (!data.inited) {
        // config数组中，已经创建过的不再创建，避免重复
        const spriteObj = new Sprite(getTextures(data.id), {
          width: data.width,
          height: data.height,
          scale: data.scale,
          zIndex: data.zIndex,
          x: data.x,
          y: data.y,
          ox: data.ox,
          oy: data.oy,
          app: this.app,
          id: data.id,
          purpose: data.type,
          name: data.id,
          pointerdown(event) {
            if (that.pointerdown) that.pointerdown(event)
          },
          pointermove(event) {
            if (that.pointermove) that.pointermove(event)
          },
          removeSprite(id) {
            if (that.removeSprite) that.removeSprite(id)
          }
        })

        // 将精灵添加到舞台
        this.stage.addChild(spriteObj)
      }
      count++
    }

    // 生成截图
    // await this.createScreenShot()
  }
  // 生成截图
  async createScreenShot() {
    let children = this.stage.children
    let minx = 9999
    let miny = 9999
    let maxx = 0
    let maxy = 0
    children.forEach((item) => {
      if (item.x < minx) minx = item.x
      if (item.y < miny) miny = item.y

      if (item.x + item.width > maxx) maxx = item.x + item.width
      if (item.y + item.height > maxy) maxy = item.y + item.height
    })

    let renderTexture = new RenderTexture.create({
      width: 800,
      height: 600,
      transparent: true
    })

    this.renderer.render(this.stage, { renderTexture })
    const canvas = this.renderer.plugins.extract.canvas(renderTexture)
    const newCanvas = this.addCanvasBg(
      canvas.getContext('2d'),
      minx,
      miny,
      maxx - minx,
      maxy - miny
    )

    let imageData = newCanvas.toDataURL('image/jpeg')
    return imageData

    // const image = new Image()
    // image.src = imageData
    // // 显示截图
    // document.body.appendChild(image)
  }
  addCanvasBg(_ctx, x, y, width, height) {
    const tmpCtx = document.createElement('canvas').getContext('2d')
    if (!tmpCtx) {
      return null
    }
    tmpCtx.fillStyle = '#ffffff' // 设置背景颜色为白色
    // 截取指定区域
    const imageData = _ctx.getImageData(x, y, width, height) // 从 (100, 100) 开始，截取宽度为 200，高度为 150 的区域
    // 创建新的 Canvas 用于显示截取的内容
    const newCanvas = document.createElement('canvas')
    newCanvas.width = width
    newCanvas.height = height
    const newCtx = newCanvas.getContext('2d')
    newCtx.fillStyle = '#ffffff' // 设置背景颜色为白色
    newCtx.putImageData(imageData, 0, 0)
    return newCtx.canvas
  }
  // 更新舞台
  uptateStage() {
    this.initStage()
  }
  // 更新精灵
  updateSprite(id, options) {
    let info = this.stage.children.find((item) => item.id == id)
    if (info && info.updateSprite) info.updateSprite(options)
  }
  // 删除Sprite后通知删除config
  removeSprite() {
    console.log('删除Sprite后通知删除config')
  }
  //销毁
  destroy() {
    this.app.config = []
    this.config = []
    this.app.destroy(true, true)
  }

  // 创建容器
  createContainer(options) {
    let { name, id, type, scale = 1, history = [], zIndex } = options
    let container = new Container()

    container.name = name
    container.id = id
    container.type = type
    // container.history = history
    container.scale.x = scale
    container.scale.y = scale
    container.zIndex = zIndex

    return container
  }
}
