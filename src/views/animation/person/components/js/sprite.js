import * as PIXI from 'pixi.js'
import Bump from 'bump.js'
import { generateUniqueID, getImgUrlV2 } from '../../utils'

const bump = new Bump(PIXI)
const { Sprite } = PIXI
// 创建精灵
export default class MySprite {
  constructor(imageUrl, options = {}) {
    this.id = ''
    this.name = ''
    this.app = options.app
    this.width = options.width
    this.height = options.height
    this.x = 0
    this.y = 0
    this.imageUrl = imageUrl
    this.interactive = true
    this.buttonMode = true
    this.dragging = false
    this.deleteBtn = null
    // 记录拖拽时，鼠标第一次点击坐标，修复坐标偏移用
    this.startPosition = {
      x: 0,
      y: 0
    }

    // 合并参数
    Object.assign(this, options)
    // 初始化
    this.init()
    return this.sprite
  }

  // 初始化
  async init() {
    let {
      width,
      height,
      scale = 1,
      zIndex = 10,
      x = 0,
      y = 0,
      imageUrl,
      interactive,
      buttonMode,
      id,
      name,
      ox = 0,
      oy = 0,
      purpose = ''
    } = this

    // 创建精灵
    this.sprite = Sprite.from(imageUrl)
    // 设置精灵自有属性
    this.sprite.width = width
    this.sprite.height = height
    this.sprite.x = x - ox
    this.sprite.y = y - oy
    this.sprite.interactive = interactive // 开启可交互性（可拖拽）
    this.sprite.buttonMode = buttonMode
    this.sprite.scale.x = scale
    this.sprite.scale.y = scale
    this.sprite.zIndex = zIndex

    // 设置自定义业务属性
    this.sprite.type = 'sprite'
    this.sprite.id = id
    this.sprite.name = name
    this.sprite.purpose = purpose

    // 新增删除按钮
    this.addDeleteBtn(this.sprite)

    // 开启事件监听
    this.enableAddEventListener()

    // 将this上的事件事件绑定到this.sprite上
    this.bindEvent()

    // 碰撞检测
    // this.hitTestRectangle(this.sprite, this.sprite.parent.children, {x: this.sprite.x, y: this.sprite.y})
  }

  // 新增删除按钮
  addDeleteBtn(sprite) {
    let that = this
    // 删除按钮
    let deleteUrl = getImgUrlV2('../../../../assets/images/icon-delete2.png')
    this.deleteBtn = new Sprite.from(deleteUrl)
    // 设置精灵自有属性
    let scale = sprite.scale.x > 1 ? 1 : sprite.scale.x
    this.deleteBtn.width = 20 // scale // 宽
    this.deleteBtn.height = 20 // scale // 高

    setTimeout(() => {
      this.deleteBtn.position.set(sprite.width - this.deleteBtn.width / 2, -10) // 定位容器comp右上角
    }, 100)

    this.deleteBtn.interactive = true // 可交互性
    this.deleteBtn.visible = false // 是否显示
    this.deleteBtn.on('pointerdown', () => {
      if (that.removeSprite) that.removeSprite(that.id)
      that.sprite.parent.removeChild(that.sprite)
    })

    // 设置自定义业务属性
    this.deleteBtn.name = '删除按钮'
    this.deleteBtn.type = 'sprite'
    this.deleteBtn.id = `${generateUniqueID()}`

    sprite.addChild(this.deleteBtn)
  }
  // 开启事件监听
  enableAddEventListener() {
    this.sprite.on('pointerdown', (event) => {
      this.enableEdit()
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
    this.sprite.enableEdit = this.enableEdit.bind(this)
    this.sprite.disableEdit = this.disableEdit.bind(this)
  }
  // 更新属性
  updateSprite(options) {
    Object.assign(this.sprite, options)
    // 更新显示列表，根据 zIndex 排序
    this.app.stage.children.sort((a, b) => a.zIndex - b.zIndex)
  }
  // 开启编辑
  enableEdit() {
    this.app.stage.children.forEach((item) => {
      item.disableEdit()
    })
    this.deleteBtn.visible = true
  }
  // 关闭编辑
  disableEdit() {
    this.deleteBtn.visible = false
  }
}
