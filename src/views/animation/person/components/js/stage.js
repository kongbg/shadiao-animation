import { Application } from 'pixi.js'
import Sprite from './sprite'
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
      backgroundColor
    })

    if (el) el.appendChild(this.app.view)

    this.stage = this.app.stage
    this.stage.type = 'stage'
    this.stage.id = id
    this.stage.name = name
    // 开启事件监听
    this.enableAddEventListener()

    // 将this上的事件事件绑定到this.sprite上
    this.bindEvent()

    // 根据config初始化画布
    this.initStage()
  }

  // 开启事件监听
  enableAddEventListener() {
    this.el.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    this.el.addEventListener('drop', (event) => {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))
      if (this.drop)
        this.drop(data.id, data.type, {
          x: event.offsetX - data.ox,
          y: event.offsetY - data.ox
        })
    })
  }
  // 将this上的事件事件绑定到this
  bindEvent() {}
  // 根据config初始化画布
  initStage() {
    let that = this
    for (let i = 0; i < this.config.length; i++) {
      let data = this.config[i]
      if (!data.inited) {
        // config数组中，已经创建过的不再创建，避免重复
        const spriteObj = new Sprite(data.url, {
          width: data.width,
          height: data.height,
          scale: data.scale,
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
            debugger
            if (that.removeSprite) that.removeSprite(id)
          }
        })
        // 将精灵添加到舞台
        this.stage.addChild(spriteObj)
      }
    }
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
}
