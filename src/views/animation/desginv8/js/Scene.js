import { Container, Text } from 'pixi.js'
import gsap from 'gsap'

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
    let {
      width,
      height,
      zIndex,
      visible = false,
      pivot = { x: 0.5, y: 0.5 },
      id,
      type = 'scene',
      name
    } = this
    this.scene = new Container()
    // 自有属性
    if (width) this.scene.width = width
    if (height) this.scene.height = height
    // 层级
    this.scene.zIndex = zIndex
    // 显示隐藏
    this.scene.visible = visible

    // 业务属性
    this.scene.id = id
    this.scene.type = type
    this.scene.name = name

    // setTimeout(()=>{
    //   // this.scene.scale.set(2)
    // }, 2000)

    // 将timeline 实例绑定在person上
    this.scene.tl = gsap.timeline({
      onComplete: () => {
        console.log('动画结束了')
      }
    })

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.scene
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    let events = [
      'on',
      'toggleVisible',
      'enlarge',
      'shrink',
      'updatePivot',
      'updatePosition',
      'run',
      'drawCaptions'
    ]
    events.forEach((key) => {
      this.scene[key] = this[key].bind(this.scene)
    })

    // this.scene.on = this.on.bind(this.scene)
    // this.scene.toggleVisible = this.toggleVisible.bind(this.scene)
    // this.scene.enlarge = this.enlarge.bind(this.scene)
    // this.scene.shrink = this.shrink.bind(this.scene)
    // this.scene.updatePivot = this.updatePivot.bind(this.scene)
    // this.scene.updatePosition = this.updatePosition.bind(this.scene)
  }

  // 切换显示隐藏
  toggleVisible(value) {
    this.visible = value
  }

  // 一系列动作
  // 放大
  enlarge(options = {}) {
    let that = this
    let { duration = 5, x, y, ease = 'linear', complete = () => {} } = options

    let dx = this.pivot.x - x
    let dy = this.pivot.y - y
    this.pivot.set(x, y)
    // 锚点改变，修正坐标保持容器位置不变
    this.x -= dx
    this.y -= dy

    this.tl.to(
      this,
      {
        duration,
        x: 200,
        y: 200,
        ease, // 运动状态
        onComplete: function () {
          // 动画播放完成时调用
          console.log('位移结束：')
          complete()
        }
      },
      ''
    )
    this.tl.to(
      this.scale,
      {
        duration,
        x: 2,
        y: 2,
        ease, // 运动状态
        onComplete: function () {
          // 动画播放完成时调用
          console.log('放大结束：')
          complete()
        }
      },
      ''
    )
  }
  // 缩小
  shrink(options = {}) {
    let that = this
    let { duration = 5, x, y, ease = 'linear', complete = () => {} } = options

    let dx = this.pivot.x - x
    let dy = this.pivot.y - y
    this.pivot.set(x, y)
    // 锚点改变，修正坐标保持容器位置不变
    this.x -= dx
    this.y -= dy

    this.tl.to(
      this,
      {
        duration,
        x: 400,
        y: 400,
        ease, // 运动状态
        onComplete: function () {
          // 动画播放完成时调用
          console.log('位移结束：')
          complete()
        }
      },
      ''
    )
    this.tl.to(
      this.scale,
      {
        duration,
        x: 0.5,
        y: 0.5,
        ease, // 运动状态
        onComplete: function () {
          // 动画播放完成时调用
          console.log('缩小结束：')
          complete()
        }
      },
      ''
    )
  }

  // 更新锚点
  updatePivot(x, y) {
    // 设置容器锚点为自身中心
    let { width, height } = this
    this.pivot.set(x || width / 2, y || height / 2)
  }

  // 更新定位
  updatePosition(x, y) {
    // 设置容器锚点为自身中心
    let { width, height } = this

    // 设置容器在画布中的位置
    this.position.set(x || width / 2, y || height / 2)
  }

  // 运行动画
  async run() {
    // 生成字幕
    this.drawCaptions('运行动画')
    await sleep(2000)
  }

  // 生成字幕
  drawCaptions(content) {
    const { width } = this
    if (content.length > 30) {
      console.log('换行')
    }
    let caption = new Text(content, {
      fontSize: 24,
      fill: 0xffffff,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: (width / 4) * 3,
      breakWords: true
    })
    caption.anchor.set(0.5, 0.5)
    caption.position.set(width / 2, 520)
    caption.zIndex = 99
    this.addChild(caption)
    console.log('this:', this)
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
    console.log('events:', events)
    events.forEach((callBack) => {
      callBack(palyLoad)
    })
  }
}

async function sleep(delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
