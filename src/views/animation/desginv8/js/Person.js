import Container from './Container'
import Sprite from './Sprite'
import { getTextures } from './textures'
import gsap from 'gsap'

export default class Person {
  constructor(options = {}) {
    this.events = {}
    this.person = null
    this.x = 0
    this.y = 0
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  async init() {
    // 创建一个容器
    // this.person = new Container()

    // let body = Sprite.from(getTextures('body'))
    // body.pivot.set(0.5)
    // body.position.set(0, 95)
    // this.person.addChild(body)

    // let headContainer = new Container()
    // headContainer.type = 'headContainer'

    // let head = Sprite.from(getTextures('head'))
    // // head.width = 50
    // // head.height = 50
    // let face2a = Sprite.from(getTextures('face-2-a'))
    // face2a.type = 'face'
    // face2a.width = 60
    // face2a.height = 60
    // face2a.position.set(20, 32)
    // face2a.visible = false
    // let face2b = Sprite.from(getTextures('face-2-b'))
    // face2b.type = 'face'
    // face2b.width = 60
    // face2b.height = 60
    // face2b.position.set(20, 32)
    // headContainer.addChild(head)
    // headContainer.addChild(face2a)
    // headContainer.addChild(face2b)
    // this.person.addChild(headContainer)

    // 通过配置创建人物
    let config = {
      id: '123',
      type: 'person',
      name: '李四',
      sprites: [
        {
          id: 'body',
          type: 'body',
          url: '',
          x: 0,
          y: 95
        },
        {
          id: 'head',
          type: 'head',
          url: '',
          children: [
            {
              id: 'head',
              type: 'head',
              url: ''
            },
            {
              id: 'face-2-a',
              type: 'face',
              name: 'face-2-a',
              url: '',
              width: 60,
              height: 60,
              x: 20,
              y: 35,
              visible: !true
            },
            {
              id: 'face-2-b',
              type: 'face',
              name: 'face-2-b',
              url: '',
              width: 60,
              height: 60,
              x: 20,
              y: 35,
              visible: true
            }
          ]
        }
      ]
    }

    // 创建一个容器
    this.person = new Container()
    this.person.type = config.type
    this.person.id = config.id
    this.person.name = config.name

    // 创建真实精灵
    this.createSprite(config.sprites, this.person)

    // 设置容器锚点为自身中心
    let { width, height } = this.person
    this.person.pivot.set(width / 2, height / 2)
    // 设置容器在画布中的位置
    this.person.position.set(this.x || width / 2, this.y || height / 2)
    // 全部子组件都addChild后更新容器边框信息
    // this.person.updateBorder(this.person)

    // 将timeline 实例绑定在person上
    this.person.tl = gsap.timeline({
      onComplete: () => {
        console.log('动画结束了')
      }
    })

    // 将this上的事件事件绑定到实例上
    this.bindEvent()

    return this.person
  }

  // 创建人物身体
  createSprite(sprites, parent, parentType = '') {
    sprites.forEach((item) => {
      let container = parent.children.find((item) => {
        return item.type == parentType
      })
      if (!container) {
        container = new Container({ type: parentType })
      }

      // 无子元素
      if (!item.children || (item.children && item.children.length == 0)) {
        if (!parentType) {
          container.type = `${item.type}container`
        }
        item.image = getTextures(item.id)
        let sprite = new Sprite(item)

        if (sprite) container.addChild(sprite)
        parent.addChild(container)
      } else {
        // // 有子元素
        this.createSprite(item.children, parent, `${item.type}Container`)
      }
    })
  }

  // 将this上的事件事件绑定到实例上
  bindEvent() {
    this.person.on = this.on.bind(this.person)
    this.person.fly = this.fly.bind(this.person)
    this.person.move = this.move.bind(this.person)
    this.person.turnAround = this.turnAround.bind(this.person)
    this.person.shakeHead = this.shakeHead.bind(this.person)
  }

  // 一系列动作
  // 斜飞
  fly(options = {}) {
    let that = this
    let {
      angle = Math.PI / 4,
      duration,
      x,
      y,
      ease = 'linear',
      complete = () => {}
    } = options

    if (duration != undefined && x != undefined && y != undefined) {
      // 旋转45°
      this.rotation = angle
      this.tl.to(
        this,
        {
          duration,
          x,
          y,
          ease, // 运动状态
          onComplete: function () {
            // 动画播放完成时调用
            console.log('fly结束：')
            that.rotation = 0
            complete()
          }
        },
        ''
      )
    }
  }
  // 移动
  move(options) {
    options.angle = 0
    this.fly(options)
  }
  // 转身
  turnAround(options = {}) {
    let that = this
    let { duration, repeat, complete = () => {} } = options
    let num = repeat || parseInt(duration / 3)
    this.tl.to(
      this,
      {
        repeat: num,
        repeatDelay: 1,
        onComplete: () => {
          setTimeout(() => {
            that.scale.x = 1
          }, 1000)
        },
        onRepeat: () => {
          if (that.scale.x == 1) {
            that.scale.x = -1
          } else {
            that.scale.x = 1
          }
        }
      },
      ''
    )
  }
  // 摇头
  shakeHead(options = {}) {
    let that = this
    let { repeat, duration, ease = 'linear', complete = () => {} } = options

    if (true) {
      // 找到头部
      let headContainer = this.children.find(
        (item) => item.type == 'headContainer'
      )
      // 找到表情
      let faces = headContainer.children.filter((item) => item.type == 'face')
      let num = repeat || duration / 0.5
      this.tl.to(
        headContainer,
        {
          yoyo: true,
          repeat: num,
          ease,
          keyframes: [
            { x: headContainer.x - 1, y: headContainer.y - 1, duration: 0.25 },
            { x: headContainer.x + 1, y: headContainer.y + 1, duration: 0.25 }
          ],
          onStart: () => {
            faces.forEach((item) => {
              item.visible = !item.visible
            })
          },
          onComplete: () => {
            faces.forEach((item) => {
              if (item.id.indexOf('-b') > -1) {
                item.visible = true
              } else {
                item.visible = false
              }
            })
          },
          onRepeat: () => {
            faces.forEach((item) => {
              item.visible = !item.visible
            })
          }
        },
        ''
      )
    }
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
