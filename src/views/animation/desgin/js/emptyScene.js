import { Text } from 'pixi.js'
import { createComp } from './tools'
import { speak, deepClone } from '../utils'
import Scene from './scene'
import gsap from 'gsap'

export default class EmptyScene extends Scene {
  constructor(game, config) {
    super(game)
    let { type, option } = config
    this.config = config
    this.type = type
    this.option = option
    this.comps = option.comps || []
    this.duration = option.duration || 0
    this.title = option.title || ''
    this.actions = option.actions || []
    this.history = this.game.history || {}
    this.copmCaches = {}
    return this
  }
  init() {
    this.clear()
    this.stage.zIndex = 10
    this.stage.type = 'scene'

    if (this.type == 'collect') {
      this.stage.addChild(this.drawCollect())
    }

    // 绘制元素
    this.comps.forEach((data) => {
      data.history = this.history
      data.screen = {
        width: this.game.width,
        height: this.game.height
      }
      this.drawComp(data)
    })
    return this
  }
  // 执行动画
  async run() {
    return new Promise(async (resolve) => {
      if (this.type == 'collect') {
        // 片头报集
        await sleep(this.duration)
        resolve([null, { msg: '片头报集结束' }])
      } else {
        let tl = gsap.timeline({
          onComplete: () => {
            console.log('动画结束了')
            resolve([null, { msg: '动画结束了' }])
          }
        })
        // 外层异步动画
        this.actions.forEach((item) => {
          console.log('this.actions:', this.actions)

          // 同步动画
          let duration = 0
          item.actions.forEach((info, oi) => {
            // 从缓存中获取sprite
            let key = `${info.target}`
            let sprite = this.copmCaches[key].sprite

            info.actions.forEach((act, ai) => {
              // 同步动画，所有的info ahead = 第一个动作的 duration
              if (oi == 0 && ai == 0) {
                duration = info.actions[0].duration
              } else {
                act.ahead = duration
                act.duration = duration
              }

              // 构建Gsap 动画参数
              act.gsapOption = getGsapOption(act)

              let { type, gsapOption: oldOption, content, audioUrl } = act

              let gsapOption = deepClone(oldOption)
              gsapOption.onStart = () => {
                if (type.includes('speak')) {
                  debugger
                  // 播放语音
                  speak({ url: audioUrl, duration: gsapOption.duration * 1000 })
                  // 生成字幕
                  this.drawCaptions(content)
                }
              }
              gsapOption.onComplete = () => {
                if (type.includes('speak')) {
                  console.log('播放语音结束')
                  // 隐藏字幕 todo 找到动态修改或者删除的方法 this.caption.parent.removeChild(this.caption)
                  this.caption.visible = false
                }
              }
              // 获取提前量
              let offset = getOffset(act)

              // 构造动画配置
              if (type[0] == 'speak') {
                // 说话

                // 操作对象就是 sprite
                tl.to(sprite, gsapOption, offset)
              } else if (type[0] == 'move') {
                // 移动

                if (type[1] == 'fly') {
                  // todo
                  // console.log('fly:', sprite)
                  // // fix: 容器没有pivot ，借助内部子元素旋转
                  // let emptySprite = sprite.children.find(item=>item.type=="emptySprite")
                  // // sprite.alpha = 0.5
                  // // 斜飞
                  // // sprite.pivot.x = 100
                  // // sprite.pivot.y = -100
                  // // sprite.rotation = 6
                  // // sprite.pivot.set(sprite.x, sprite.y)
                  // sprite.pivot.x = 100
                  // sprite.pivot.y = 100
                  // tl.to(sprite, gsapOption, offset);
                } else if (type[1] == 'translate') {
                  // 平移

                  // 操作对象就是 sprite
                  tl.to(sprite, gsapOption, offset)
                } else {
                  // 默认平移

                  // 操作对象就是 sprite
                  tl.to(sprite, gsapOption, offset)
                }
              } else if (type[0] == 'head') {
                // 头部
                if (type[1] == 'shake') {
                  // 摇头
                  // 操作对象就是 sprite children 中type == head , face 的 sprite
                  let imgContainer = sprite.children.find((item) =>
                    ['imgContainer'].includes(item.type)
                  )
                  let childSprite = imgContainer.children.filter((item) =>
                    ['head', 'face'].includes(item.type)
                  )
                  if (childSprite.length) {
                    childSprite.forEach((child) => {
                      let option = {
                        yoyo: true,
                        repeat: gsapOption.duration * 4,
                        ease: 'linear',
                        keyframes: [
                          { x: child.x - 1, y: child.y - 1, duration: 0.25 },
                          { x: child.x + 1, y: child.y + 1, duration: 0.25 }
                        ]
                      }
                      tl.to(child, option, offset)
                    })
                  }
                }
              } else if (type[0] == 'face') {
                // 表情
                // todo
              }
            })
          })
        })

        // 生成gsapOption
        function getGsapOption(act) {
          let newAct = deepClone(act)
          delete newAct.content
          delete newAct.type
          delete newAct.contentId
          delete newAct.id
          delete newAct.gsapOption
          let gsapOption = {
            ...newAct
          }
          return gsapOption
        }
        // 获取偏移量
        function getOffset(act) {
          let offset = `-=0`
          // 提前
          if (act.ahead) {
            offset = `-=${act.ahead}`
          }
          // 延时
          if (act.delay) {
            offset = `-+=${act.delay}`
          }
          return offset
        }
        // tl.play()
        // tl.pause();
        // setTimeout(()=>{
        //     tl.play()
        // },3000)
      }
    })
  }
  // 绘制元素
  drawComp(data) {
    this.createAndAddComp(data)
  }
  // 缓存精灵，执行动画时使用
  copmCache(comp) {
    if (!this.copmCaches[comp.id]) {
      this.copmCaches[comp.id] = {
        id: comp.id,
        name: comp.name,
        type: comp.type,
        sprite: comp
      }
    }
  }
  // 添加精灵到场景中
  addRectangle(comp) {
    this.stage.addChild(comp)
  }
  // 创建并添加精灵到场景中
  createAndAddComp(data) {
    // 根据type 生成不同的精灵或者容器
    let comp = createComp(data)
    this.copmCache(comp)
    this.addRectangle(comp)
  }
  // 绘制集数提示
  drawCollect() {
    const { width } = this.game
    this.collect = new Text(this.title, {
      fontSize: 50,
      fill: 0xffffff,
      align: 'left'
    })
    this.collect.anchor.set(0.5, 0.5)
    this.collect.position.set(width / 2, 280)
    this.collect.zIndex = 12
    return this.collect
  }
  // 通过id 设置精灵高亮
  setSpriteLineHeight(id) {
    this.stage.children.forEach((child) => {
      if (child.id == id) {
        let borderLine = child.children.find(
          (item) => item.name == 'borderLine'
        )
        borderLine.visible = true
      } else {
        let borderLine = child.children.find(
          (item) => item.name == 'borderLine'
        )
        borderLine.visible = false
      }
    })
  }
  // 通过id 设置精灵层级
  setSpriteZindex(id, zIndex) {
    this.stage.children.forEach((child) => {
      if (child.id == id && zIndex) {
        child.zIndex = zIndex
      }
    })
  }
  // 通过id 设置精灵属性
  updataComp(id, options) {
    this.stage.children.forEach((child) => {
      if (child.id == id) {
        console.log('child:', child, options)
        let children = null
        if (options.children) {
          children = options.children
          delete options.children
        }
        Object.assign(child, options)

        if (children) {
          child.children.forEach((item) => {
            if (item.type == 'imgContainer') {
              item.children.forEach((info) => {
                Object.assign(info, children[info.type])
              })
            }
          })
        }
      }
    })
  }
  // 绘制字幕
  drawCaptions(content) {
    const { width } = this.game
    if (content.length > 30) {
      console.log('换行')
    }
    this.caption = new Text(content, {
      fontSize: 18,
      fill: 0xffffff,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: (width / 4) * 3,
      breakWords: true
    })
    this.caption.anchor.set(0.5, 0.5)
    this.caption.position.set(width / 2, 520)
    this.caption.zIndex = 12
    this.stage.addChild(this.caption)
  }
  // 左右翻转
  flipSpriteHorizontally(sprite) {
    sprite.scale.x = -1
  }
}

function sleep(delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
