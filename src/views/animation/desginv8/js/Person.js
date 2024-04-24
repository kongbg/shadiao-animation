import Container from './Container'
import Sprite from './Sprite'
import { getTextures } from './textures'

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
            },
            {
                id: 'head',
                type: 'head',
                url: '',
                children: [
                    {
                        id: 'head',
                        type: 'head',
                        url: '',
                    },
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
    this.person.pivot.set(width / 2,height / 2)
    // 设置容器在画布中的位置
    this.person.position.set(this.x || width / 2, this.y|| height / 2)
    // 全部子组件都addChild后更新容器边框信息
    this.person.updateBorder(this.person)

    return this.person
  }

  // 创建人物身体
  createSprite(sprites, parent) {
    sprites.forEach(item=>{
        // 无子元素
        if (!item.children || (item.children && item.children.length == 0)) {
            let container = new Container()

            item.image = getTextures(item.id)
            let sprite = new Sprite(item)

            if (sprite) container.addChild(sprite)
            parent.addChild(container)
        } else { // 有子元素
            this.createSprite(item.children, parent)
        }
    })
  }
}
