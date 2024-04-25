import Container from './Container'
import Sprite from './Sprite'
import { getTextures } from './textures'
import gsap from 'gsap'

export default class Background {
  constructor(options = {}) {
    this.events = {}
    this.background = null
    this.x = 0
    this.y = 0
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  async init() {
    // 创建一个容器
    this.background = new Container()

    let bg1 = new Sprite({image: getTextures('1')})
    this.background.addChild(bg1)

    // 设置容器锚点为自身中心
    let { width, height } = this.background
    this.background.pivot.set(width / 2, height / 2)

    // 设置容器在画布中的位置
    this.background.position.set(this.x || width / 2, this.y || height / 2)

    // 放大，充满场景
    // this.background.scale.set(1.5)

    // 将timeline 实例绑定在person上
    this.background.tl = gsap.timeline({
      onComplete: () => {
        console.log('动画结束了')
      }
    })

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.background
  }


  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.background.on = this.on.bind(this.background)
  }

  // 一系列动作

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
