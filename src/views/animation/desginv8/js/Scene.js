import { Container } from 'pixi.js'
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
    let {width, height, zIndex, pivot={x:0.5,y:0.5}, id,type='scene',name} = this
    this.scene = new Container()
    // 自有属性
    if(width) this.scene.width = width
    if(height) this.scene.height = height
    // 层级
    this.scene.zIndex = zIndex

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
    this.scene.on = this.on.bind(this)
    this.scene.toggleVisible = this.toggleVisible.bind(this)
    this.scene.enlarge = this.enlarge.bind(this.scene)
    this.scene.shrink = this.shrink.bind(this.scene)
    this.scene.updatePivot = this.updatePivot.bind(this.scene)
    this.scene.updatePosition = this.updatePosition.bind(this.scene)
    
  }

  // 切换显示隐藏
  toggleVisible (value) {
    this.scene.visible = value
  }

  // 一系列动作
  // 放大
  enlarge(options = {}) {
    let that = this
    let {
      duration=5,
      x,
      y,
      ease = 'linear',
      complete = () => {}
    } = options
    
    let dx = this.pivot.x - x;
    let dy = this.pivot.y - y;
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
    let {
      duration=5,
      x,
      y,
      ease = 'linear',
      complete = () => {}
    } = options
    
    let dx = this.pivot.x - x;
    let dy = this.pivot.y - y;
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
        x: 1,
        y: 1,
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
