<template>
  <div class="donghua-warp">
    <div ref="pixiContainer"></div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import {
  Application,
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

const pixiContainer = ref(null)

let urls = [
  {
    key: '1',
    value: 'https://g.mdcdn.cn/h5/img/act/201711/new-1-1.jpg'
  },
  {
    key: '2',
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

async function init() {
  let app = null
  let resources = await loaderResource(urls)

  // 缓存资源
  cacheTextures(resources)

  // 创建舞台
  app = new Application({
    width: window.innerWidth, //800,
    height: window.innerHeight //600,
    // backgroundColor: 0x1099bb
  })

  let stage = app.stage

  pixiContainer.value.appendChild(app.view)

  let scene = new Container()
  scene.pivot.set(0.5)

  let sprite1 = Sprite.from(getTextures('1'))

  scene.addChild(sprite1)

  // 创建序列帧动画的纹理数组
  const frames = []
  var urlPadding = 'https://g.mdcdn.cn/h5/img/act/201711/'
  for (let i = 1; i <= 10; i++) {
    frames.push(Texture.from(`${urlPadding}new-1-sky-${i}.jpg`))
  }

  // 创建 AnimatedSprite 对象
  const animatedSprite = new AnimatedSprite(frames)
  // 设置动画播放速度和循环
  animatedSprite.animationSpeed = 0.1 // 设置动画播放速度
  animatedSprite.loop = true // 设置动画循环播放
  // 添加到舞台并播放动画
  scene.addChild(animatedSprite)

  let sprite2 = Sprite.from(getTextures('2'))
  sprite2.position.set(290, 297)
  scene.addChild(sprite2)
  //
  let sprite3 = Sprite.from(getTextures('3'))
  scene.addChild(sprite3)

  animatedSprite.play()

  // setTimeout(() => {
  //   scene.scale.set(1.2, 1.2)
  // }, 1000)
  // setTimeout(() => {
  //   scene.scale.set(1, 1)
  // }, 3000)

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

  function addPerson() {
    let psersonContainer = new Container()
    let body = Sprite.from(getTextures('body'))
    body.pivot.set(0.5)
    body.position.set(0, 95)
    psersonContainer.addChild(body)

    let headContainer = new Container()

    let head = Sprite.from(getTextures('head'))
    // head.width = 50
    // head.height = 50
    let face = Sprite.from(getTextures('face'))
    face.width = 60
    face.height = 60
    face.position.set(20, 32)
    headContainer.addChild(head)
    headContainer.addChild(face)

    // headContainer.pivot.set(0.5)
    // headContainer.rotation = Math.PI / 4
    psersonContainer.addChild(headContainer)

    let borderLine = new Graphics()
    borderLine.lineStyle(1, 0x0000ff)
    borderLine.position.set(0, 0) // 定位容器comp左上角
    borderLine.width = psersonContainer.width
    borderLine.height = psersonContainer.height
    borderLine.drawRect(0, 0, psersonContainer.width, psersonContainer.height)
    borderLine.visible = true

    psersonContainer.addChild(borderLine)

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

    setposition()
    function setposition() {
      //开始位置声明
      console.log('psersonContainer:', psersonContainer)
      var startPositionW = psersonContainer.position
      console.log(startPositionW)

      let T = new TWEEN.Tween(startPositionW)
        .to({ x: 400 }, 3 * 1000)
        .onUpdate(function () {
          console.log('onUpdate', this)
          // psersonContainer.x = this.x
        })
        .onComplete(function () {
          console.log('onComplete')
        })
      console.log('T :', T)
      T.start()
    }
  }
  addPerson()

  stage.addChild(scene)
}

onMounted(() => {
  init()
})
</script>
