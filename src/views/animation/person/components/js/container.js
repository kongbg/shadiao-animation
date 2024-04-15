import * as PIXI from 'pixi.js'
import Bump from 'bump.js'
import { generateUniqueID, getImgUrlV2 } from '../../utils'

const bump = new Bump(PIXI)
const { Sprite, Container, Graphics } = PIXI
// 创建精灵
export default class MyContainer {
  constructor(imageUrl, options = {}) {
    this.id = ''
    this.name = ''
    this.app = options.app
    this.x = 0
    this.y = 0
    this.imageUrl = imageUrl
    this.interactive = true
    this.buttonMode = true
    this.dragging = false
    // 记录拖拽时，鼠标第一次点击坐标，修复坐标偏移用
    this.startPosition = {
      x: 0,
      y: 0
    }

    // 合并参数
    Object.assign(this, options)
    // 初始化
    this.init()
    return this.comp
  }

  // 初始化
  async init() {
    let { scale = 1, zIndex = 10, x = 0, y = 0, id } = this

    // 创建容器
    let comp = this.createContainer({
      name: 'spriteWrap',
      id,
      type: 'container',
      scale,
      purpose: 'spriteWrap',
      zIndex
    })

    // 真实内容容器
    let imgContainer = this.createContainer({
      name: ' sprit集合',
      id,
      type: 'container',
      scale,
      purpose: 'spritContainer',
      zIndex
    })

    // 边框
    let borderLine = new Graphics()
    // 设置精灵自有属性
    borderLine.lineStyle(1, 0x0000ff) // 边框宽度，颜色
    borderLine.position.set(0, 0) // 定位容器comp左上角
    borderLine.width = imgContainer.width
    borderLine.height = imgContainer.height
    borderLine.drawRect(0, 0, imgContainer.width, imgContainer.height)
    borderLine.visible = true // 是否显示
    // 设置自定义业务属性
    borderLine.name = '边框'
    borderLine.type = 'graphics'
    borderLine.purpose = 'borderLine'
    borderLine.id = `${generateUniqueID()}`

    // 删除按钮
    let deleteUrl = getImgUrlV2('assets/images/icon-delete.png')
    let deleteBtn = new Sprite.from(deleteUrl)
    // 设置精灵自有属性
    deleteBtn.width = 20 // 宽
    deleteBtn.height = 20 // 高
    deleteBtn.position.set(imgContainer.width - deleteBtn.width / 2, -10) // 定位容器comp右上角
    deleteBtn.interactive = true // 可交互性
    deleteBtn.visible = true // 是否显示
    deleteBtn.on('pointerdown', () => {
      //   comp.isDeleteIng = true
      //   comp.parent.removeChild(comp)
      //   Bus.$emit('removeComp', comp)
    })

    // 设置自定义业务属性
    deleteBtn.name = '删除按钮'
    deleteBtn.type = 'sprite'
    borderLine.purpose = 'deleteBtn'
    deleteBtn.id = `${generateUniqueID()}`

    // 依次加入容器，后加入的层级高
    comp.addChild(imgContainer)
    comp.addChild(borderLine)
    comp.addChild(deleteBtn)

    // 锚点，定位都给最外层容器
    comp.pivot.set(comp.width / 2, comp.height / 2)
    let rx = x < comp.width / 2 ? comp.width / 2 : x
    let ry = x < comp.height / 2 ? comp.height / 2 : y
    comp.position.set(rx, ry)

    this.comp = comp

    // 开启事件监听
    // this.enableAddEventListener()

    // 将this上的事件事件绑定到this.sprite上
    // this.bindEvent()

    // 碰撞检测
    // this.hitTestRectangle(this.sprite, this.sprite.parent.children, {x: this.sprite.x, y: this.sprite.y})
  }

  // 开启事件监听
  enableAddEventListener() {
    this.sprite.on('pointerdown', (event) => {
      if (this.pointerdown) this.pointerdown(event)
      this.dragging = true
      let scale = event.currentTarget.scale
      let offset = event.data.getLocalPosition(this.sprite)
      this.startPosition = {
        x: offset.x * scale.x,
        y: offset.y * scale.y
      }
    })
    this.sprite.on('pointermove', (event) => {
      if (this.dragging) {
        if (this.pointermove) this.pointermove(event)
        const newPosition = event.data.getLocalPosition(this.sprite.parent)
        this.sprite.x = newPosition.x - this.startPosition.x
        this.sprite.y = newPosition.y - this.startPosition.y
      }
    })
    this.sprite.on('pointerup', (event) => {
      //   this.hitTestRectangle(
      //     this.sprite,
      //     event.currentTarget.parent.children,
      //     event.data.getLocalPosition(this.sprite.parent)
      //   );
      if (
        this.dragging &&
        event.data.global.x > 0 &&
        event.data.global.y > 0 &&
        event.data.global.x < this.app.renderer.width &&
        event.data.global.y < this.app.renderer.height
      ) {
        const newPosition = event.data.getLocalPosition(this.sprite.parent)
        this.sprite.x = newPosition.x - this.startPosition.x
        this.sprite.y = newPosition.y - this.startPosition.y
        if (this.dragging && this.sprite.containsPoint(event.data.global)) {
          this.sprite.position.set(this.sprite.x, this.sprite.y)
        }
      }
      this.dragging = false
    })
  }
  // 碰撞检测
  hitTestRectangle(soure, sprites = [], options) {
    for (let i = 0; i < sprites.length; i++) {
      let target = sprites[i]
      let flag = bump.hitTestRectangle(soure, target)
      if (flag && soure !== target) {
        let tx = target.x + target.width
        let ty = target.y + target.height
        if (
          options.x > target.x &&
          options.x < tx &&
          options.y > target.y &&
          options.y < ty
        ) {
          console.log('真碰撞了')
          sprites[i].addChild(soure)
        }
      }
    }
  }
  dohitTestRectangle() {
    this.hitTestRectangle(this.sprite, this.sprite.parent.children, {
      x: this.sprite.x,
      y: this.sprite.y
    })
  }
  // 将this上的事件事件绑定到this.sprite上
  bindEvent() {
    this.sprite.updateSprite = this.updateSprite.bind(this)
  }
  // 更新属性
  updateSprite(options) {
    // Object.assign(this.sprite, options)
    // 更新显示列表，根据 zIndex 排序
    this.app.stage.children.sort((a, b) => a.zIndex - b.zIndex)
  }
  // 创建容器
  createContainer(options) {
    let { name, id, purpose, scale = 1, history, zIndex } = options
    let container = new Container()

    container.name = name
    container.id = id
    container.purpose = purpose
    container.type = 'container'
    // container.history = history
    container.scale.x = scale
    container.scale.y = scale
    container.zIndex = zIndex

    return container
  }
}
