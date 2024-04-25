<template>
  <div ref="donghuaRef" class="donghua-warp">
    <div ref="pixiContainer"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import {
  Loader,
  Sprite,
  AnimatedSprite,
  Texture,
  Container,
  Graphics
} from 'pixi.js'
import { setTextures, getTextures } from './js/textures'
import { getImgUrlV2 } from './utils'
import * as TWEEN from '@tweenjs/tween.js'
import gsap from 'gsap'
import Stage from './js/Stage'
import Background from './js/Background'
import Person from './js/Person'
import Scene from './js/Scene'

let app = null
const pixiContainer = ref(null)
const donghuaRef = ref(null)

let urls = [
  {
    key: '9bgd6dn2',
    value: 'https://g.mdcdn.cn/h5/img/act/201711/new-1-1.jpg'
  },
  {
    key: '9bg86dn3',
    value: 'https://g.mdcdn.cn/h5/img/act/201711/new-1-2.png'
  },
  {
    key: '3',
    value: 'https://g.mdcdn.cn/h5/img/act/201711/new-1-3.png'
  },
  {
    key: 'body',
    value: getImgUrlV2('../../../../assets/images/v8/body.png')
  },
  {
    key: 'head',
    value: getImgUrlV2('../../../../assets/images/v8/head.png')
  },
  {
    key: 'face',
    value: getImgUrlV2('../../../../assets/images/v8/face.png')
  },
  {
    key: 'face-2-a',
    value: getImgUrlV2('../../../../assets/images/v8/2-a.png')
  },
  {
    key: 'face-2-b',
    value: getImgUrlV2('../../../../assets/images/v8/2-b.png')
  }
]

// 预加载资源
async function loaderResource(urls) {
  let loader = new Loader()
  return new Promise((resolve, reject) => {
    urls.forEach((item) => {
      let { key, value } = item
      if (!getTextures(key)) {
        loader.add(key, value, () => {})
      }
    })
    loader.load((loader, resources) => {
      console.log('预加载资源完成')
      resolve(resources)
    })
  })
}
// 缓存资源
function cacheTextures(res) {
  Object.entries(res).forEach(([key, value]) => {
    setTextures(key, value.texture)
  })
}

async function init2() {
  let app = null
  let resources = await loaderResource(urls)

  // 缓存资源
  cacheTextures(resources)

  // 创建舞台
  app = new Stage({
    el: pixiContainer.value,
    width: donghuaRef.value.offsetWidth,
    height: donghuaRef.value.offsetHeight
    // backgroundColor: 0x1099bb
  })

  let stage = app.stage

  // 创建场景
  let scene = new Scene()
  scene.on('ok', () => {
    console.log('ok')
  })

  //   let sprite1 = Sprite.from(getTextures('1'))

  //   scene.addChild(sprite1)

  // 创建序列帧动画的纹理数组
  // const frames = []
  // var urlPadding = 'https://g.mdcdn.cn/h5/img/act/201711/'
  // for (let i = 1; i <= 10; i++) {
  //   frames.push(Texture.from(`${urlPadding}new-1-sky-${i}.jpg`))
  // }

  //   // 创建 AnimatedSprite 对象
  //   const animatedSprite = new AnimatedSprite(frames)
  //   // 设置动画播放速度和循环
  //   animatedSprite.animationSpeed = 0.1 // 设置动画播放速度
  //   animatedSprite.loop = true // 设置动画循环播放
  //   // 添加到舞台并播放动画
  //   scene.addChild(animatedSprite)

  //   let sprite2 = Sprite.from(getTextures('2'))
  //   sprite2.position.set(290, 297)
  //   scene.addChild(sprite2)
  //   //
  //   let sprite3 = Sprite.from(getTextures('3'))
  //   scene.addChild(sprite3)

  //   animatedSprite.play()

  // setTimeout(() => {
  //   scene.scale.set(1.2, 1.2)
  // }, 1000)
  // setTimeout(() => {
  //   scene.scale.set(1, 1)
  // }, 3000)

  let bg1Params = { x: app.renderer.width / 2, y: app.renderer.height / 2 }
  console.log('bg1Params:', bg1Params)
  let bg1 = await new Background(bg1Params)

  scene.addChild(bg1)

  //   setTimeout(()=>{
  //     scene.enlarge()
  //   }, 2000)

  let person1 = await new Person({ x: 460, y: 530 })
  //   person1.rotation = Math.PI / 4
  // console.log('person1:', person1)

  // 飞
  // person1.fly({
  //   duration: 1.5,
  //   x: 500,
  //   y: 120
  // })

  // // 移动
  // person1.move({
  //   duration: 1,
  //   x: 500,
  //   y: 120
  // })

  // 转身
  //   person1.turnAround({ duration: 10 })

  // 摇头
  //   person1.shakeHead({ duration: 10 })

  scene.addChild(person1)

  // 创建人物
  async function createPerson() {
    let psersonContainer = new Container()
    let body = Sprite.from(getTextures('body'))
    body.pivot.set(0.5)
    body.position.set(0, 95)
    psersonContainer.addChild(body)

    let headContainer = new Container()
    headContainer.type = 'headContainer'

    let head = Sprite.from(getTextures('head'))
    // head.width = 50
    // head.height = 50
    let face2a = Sprite.from(getTextures('face-2-a'))
    face2a.type = 'face'
    face2a.width = 60
    face2a.height = 60
    face2a.position.set(20, 32)
    face2a.visible = false
    let face2b = Sprite.from(getTextures('face-2-b'))
    face2b.type = 'face'
    face2b.width = 60
    face2b.height = 60
    face2b.position.set(20, 32)
    headContainer.addChild(head)
    headContainer.addChild(face2a)
    headContainer.addChild(face2b)

    // headContainer.pivot.set(0.5)
    // headContainer.rotation = Math.PI / 4
    psersonContainer.addChild(headContainer)

    // let borderLine = new Graphics()
    // borderLine.lineStyle(1, 0x0000ff)
    // borderLine.position.set(0, 0) // 定位容器comp左上角
    // borderLine.width = psersonContainer.width
    // borderLine.height = psersonContainer.height
    // borderLine.drawRect(0, 0, psersonContainer.width, psersonContainer.height)
    // borderLine.visible = true

    // psersonContainer.addChild(borderLine)

    // 设置容器锚点为自身中心
    psersonContainer.pivot.set(
      psersonContainer.width / 2,
      psersonContainer.height / 2
    )
    // 设置容器在画布中的位置
    psersonContainer.position.set(200, 200)
    // 旋转45°
    // psersonContainer.rotation = Math.PI / 4

    scene.addChild(psersonContainer)

    function setposition() {
      //开始位置声明
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })
      tl.to(
        psersonContainer,
        {
          duration: 5,
          x: 500,
          ease: 'linear' // 运动状态
        },
        ''
      )
    }

    function shakeHead() {
      //开始位置声明
      console.log('psersonContainer:', psersonContainer)
      let headContainer = psersonContainer.children.find(
        (item) => item.type == 'headContainer'
      )
      let faces = headContainer.children.filter((item) => item.type == 'face')
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
          // resolve([null, { msg: '动画结束了' }])
        }
      })
      tl.to(
        headContainer,
        {
          yoyo: true,
          repeat: 10,
          ease: 'linear',
          keyframes: [
            { x: headContainer.x - 1, y: headContainer.y - 1, duration: 0.25 },
            { x: headContainer.x + 1, y: headContainer.y + 1, duration: 0.25 }
          ],
          onRepeat: () => {
            faces.forEach((item) => {
              item.visible = !item.visible
            })
          }
        },
        ''
      )
    }

    function setposition45() {
      // 旋转45°
      psersonContainer.rotation = Math.PI / 4
      //开始位置声明
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
          psersonContainer.rotation = 0
        }
      })
      tl.to(
        psersonContainer,
        {
          duration: 5,
          x: 500,
          ease: 'linear' // 运动状态
        },
        ''
      )
    }
    function fadeIn() {
      console.log(psersonContainer)
      //开始位置声明
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })
      tl.to(
        psersonContainer,
        {
          duration: 0.1,
          alpha: 1,
          ease: 'linear' // 运动状态
        },
        ''
      )
      let tl2 = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })
      tl2.to(
        face2b,
        {
          duration: 0.1,
          alpha: 1,
          ease: 'linear' // 运动状态
        },
        ''
      )
    }
    function fadeOut() {
      console.log(psersonContainer)
      //开始位置声明
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })
      tl.to(
        psersonContainer,
        {
          duration: 2,
          alpha: 0,
          ease: 'linear' // 运动状态
        },
        ''
      )
      let tl2 = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })
      tl2.to(
        face2b,
        {
          duration: 2,
          alpha: 0,
          ease: 'linear' // 运动状态
        },
        ''
      )
    }

    function scaleX() {
      //开始位置声明
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
          // resolve([null, { msg: '动画结束了' }])
        }
      })
      tl.to(
        psersonContainer,
        {
          repeat: 10,
          repeatDelay: 1,
          onRepeat: () => {
            if (psersonContainer.scale.x == 1) {
              psersonContainer.scale.x = -1
            } else {
              psersonContainer.scale.x = 1
            }
          }
        },
        ''
      )
    }

    function yj() {
      let tl = gsap.timeline({
        onComplete: () => {
          console.log('动画结束了')
        }
      })

      // 使用 TweenMax 实现缓动效果
      function tweenCamera(newCameraX, newCameraY, newZoomLevel, duration) {
        tl.to(app.stage, duration, {
          x: 0, //app.renderer.width / 2 - newCameraX * newZoomLevel,
          y: 0, //app.renderer.height / 2 - newCameraY * newZoomLevel,
          scaleX: newZoomLevel,
          scaleY: newZoomLevel,
          ease: 'linear' // 使用 Power2 缓动函数
        })
      }

      // 运镜效果，从当前位置缓动到新位置和缩放比例
      tweenCamera(100, 100, 2, 3) // 以 (100, 100) 为中心，缩放为 1.2 倍，持续 1 秒
      // tweenCamera(app.renderer.width / 2, app.renderer.height / 2, 1.2, 3)
    }

    // 初始化镜头位置和缩放比例
    let cameraX = 0
    let cameraY = 0
    let zoomLevel = 1

    // 更新镜头位置和缩放比例
    function updateCamera() {
      app.stage.x = app.renderer.width / 2 - cameraX * zoomLevel
      app.stage.y = app.renderer.height / 2 - cameraY * zoomLevel
      app.stage.scale.set(zoomLevel)
    }

    // 模拟运镜效果
    function panAndZoom(newCameraX, newCameraY, newZoomLevel) {
      cameraX = newCameraX
      cameraY = newCameraY
      zoomLevel = newZoomLevel
      updateCamera()
    }

    function panAndZoom222() {
      setTimeout(() => {
        // 初始位置和缩放比例
        panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.2) // 以 (100, 100) 为中心，缩放为 2 倍
      }, 100)
    }
    // panAndZoom222()

    // 平移
    // setposition()
    // 说话
    // shakeHead()
    // 飞
    // setposition45()
    // 淡入
    // setTimeout(() => {
    //   fadeIn()
    // }, 4000)
    // // 淡出
    // setTimeout(() => {
    //   fadeOut()
    // }, 2000)
    // 左右翻转
    // scaleX()

    // 运镜
    // yj()
  }
  //   createPerson()

  scene.updatePivot()
  scene.updatePosition()
  setTimeout(() => {
    scene.enlarge({ x: 460, y: 460 })
  }, 2000)
  setTimeout(() => {
    scene.shrink({ x: 460, y: 460 })
  }, 10000)

  // scene.rotation = Math.PI / 4

  stage.addChild(scene)
}
async function init() {
  let stageInfo = {
    id: '9bgd7dnd',
    name: '第一章',
    scenes: [
      {
        id: '9bgd7dn0',
        sprites: [
          {
            id: '9bgd6dn2',
            type: 'background'
          },
          {
            id: '9bgd6pdj',
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
        ],
        content: [
          {
            id: 'jir7qxjv',
            speak: '秦天',
            content: '诸位爱卿，今日可有事要奏。\r'
          },
          {
            id: 'gyb7fh0y',
            speak: '袁天罡',
            content:
              '微臣有事要奏，昨日豫州刺史来报，豫州数县已经有近半月滴雨未下，恳请陛下派遣钦天监修士前往做法缓解旱情。\r'
          }
        ]
      },
      {
        id: '9bgd7dw7',
        sprites: [
          {
            id: '9bg86dn3',
            type: 'background'
          }
        ]
      }
    ]
  }

  let resources = await loaderResource(urls)

  // 缓存资源
  cacheTextures(resources)

  // 创建舞台
  app = new Stage({
    el: pixiContainer.value,
    width: donghuaRef.value.offsetWidth,
    height: donghuaRef.value.offsetHeight
    // backgroundColor: 0x1099bb
  })

  // console.log('创建舞台:', app)

  let stage = app.stage

  let scenes = stageInfo.scenes || []
  let leng = scenes.length
  let current = 0
  while (current < leng) {
    let option = scenes[current]
    let sprites = option.sprites || []
    let sleng = sprites.length
    let scurrent = 0

    // console.log('option:', option)
    // 创建场景
    let scene = new Scene({ visible: current == 0 })

    while (scurrent < sleng) {
      let soption = sprites[scurrent]
      // console.log('soption:', soption)

      let sprite = await createSprite(soption)
      if (sprite) scene.addChild(sprite)

      scurrent++
    }

    stage.addChild(scene)

    current++
  }

  setTimeout(() => {
    stage.play()
  }, 2000)

  console.log('stage:', stage)
}

async function createSprite(options) {
  let scrite = null
  switch (options.type) {
    case 'background':
      options.x = app.renderer.width / 2
      options.y = app.renderer.height / 2
      scrite = await new Background(options)
      break
    case 'person':
      scrite = await new Person(options)
      break
    default:
      break
  }
  return scrite
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
.donghua-warp {
  min-height: calc(100vh - 84px);
}
</style>
