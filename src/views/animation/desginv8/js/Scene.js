
import { Container } from 'pixi.js'

export default class Scene {
constructor(options = {}) {
    this.events = {}
    this.scene = null
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  init() {
    let {width, height, zIndex, pivot={x:0.5,y:0.5}, id,type='scene',name} = this
    this.scene = new Container()
    // 自有属性
    if(width) this.scene.width = width
    if(height) this.scene.height = height
    // 层级
    this.scene.zIndex = zIndex
    // 锚点, 这里应该有问题，应该异步设置锚点。等其他子元素全部创建好以后，再设置锚点为宽高的一半
    this.scene.pivot.set(pivot.x, pivot.y)

    // 业务属性
    this.scene.id = id
    this.scene.type = type
    this.scene.name = name

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.scene
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.scene.on = this.on.bind(this)
    this.scene.toggleVisible = this.toggleVisible.bind(this)
  }

  // 切换显示隐藏
  toggleVisible (value) {
    this.scene.visible = value
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
  emit(name, palyLoad){
    let events = this.events[name] || []
    events.forEach(callBack => {
      callBack(palyLoad)
    });
  }
}
