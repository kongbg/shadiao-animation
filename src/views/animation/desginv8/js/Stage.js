
import { Application } from 'pixi.js'

export default class Stage {
constructor(options = {}) {
    this.events = {}
    this.app = null
    this.el = options.el
    delete options.el
    this.options = options

    return this.init()
  }

  // 初始化
  init() {
    // 创建舞台
    this.app = new Application(this.options)

    // 舞台添加到el上
    this.el.appendChild(this.app.view)

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.app
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.app.stage.on = this.on.bind(this)
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
