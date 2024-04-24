import { Container, Graphics } from 'pixi.js'

export default class _Container {
  constructor(options = {}) {
    this.events = {}
    this.container = null
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  init() {
    let {
      width,
      height,
      zIndex,
      pivot = { x: 0.5, y: 0.5 },
      id,
      type = 'container',
      name
    } = this
    this.container = new Container()
    // 自有属性
    if (width) this.container.width = width
    if (height) this.container.height = height
    // 层级
    this.container.zIndex = zIndex
    // 锚点
    this.container.pivot.set(pivot.x, pivot.y)

    // 业务属性
    this.container.id = id
    this.container.type = type
    this.container.name = name

    // 生成边框
    this.createBorder()

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.container
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.container.on = this.on.bind(this.container)
    this.container.toggleVisible = this.toggleVisible.bind(this.container)
    this.container.updateBorder = this.updateBorder.bind(this.container)
  }

  // 切换显示隐藏
  toggleVisible(value) {
    this.container.visible = value
  }

  // 生成边框
  createBorder() {
    let borderLine = new Graphics()
    // 自有属性
    borderLine.lineStyle(1, 0x0000ff)
    borderLine.position.set(0, 0) // 定位容器comp左上角
    borderLine.width = 0
    borderLine.height = 0
    borderLine.visible = false

    // 业务属性
    borderLine.id = ''
    borderLine.type = 'borderLine'
    borderLine.name = ''

    this.container.borderLine = borderLine
    this.container.addChild(borderLine)

    setTimeout(() => {
      this.container.updateBorder()
    }, 1000)
  }

  // 更新容器边框属性
  updateBorder() {
    let { width, height } = this
    this.borderLine.width = width
    this.borderLine.height = height
    this.borderLine.drawRect(0, 0, width, height)
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
