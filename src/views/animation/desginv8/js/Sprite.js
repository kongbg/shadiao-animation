import { Sprite } from 'pixi.js'

export default class _Sprite {
  constructor(options = {}) {
    this.events = {}
    this.sprite = null
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  init() {
    let {
      image,
      width,
      height,
      x = 0,
      y = 0,
      zIndex,
      pivot = { x: 0.5, y: 0.5 },
      visible = true,
      id,
      type = 'sprite',
      name
    } = this
    this.sprite = new Sprite.from(image)
    // 自有属性
    if (width) this.sprite.width = width
    if (height) this.sprite.height = height
    // 层级
    this.sprite.zIndex = zIndex
    this.sprite.visible = visible
    this.sprite.x = x
    this.sprite.y = y

    // 业务属性
    this.sprite.id = id
    this.sprite.type = type
    this.sprite.name = name

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.sprite
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.sprite.on = this.on.bind(this)
    this.sprite.toggleVisible = this.toggleVisible.bind(this)
  }

  // 切换显示隐藏
  toggleVisible(value) {
    this.sprite.visible = value
  }

  // 监听事件
  on(name, callBack) {
    if (name in this.events) {
      this.events[name].push(callBack)
    } else {
      this.events[name] = [callBack]
    }
  }

  // 触发事件
  emit(name, palyLoad) {
    let events = this.events[name] || []
    events.forEach((callBack) => {
      callBack(palyLoad)
    })
  }
}
