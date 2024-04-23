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
  Container
} from 'pixi.js'
import { setTextures, getTextures } from './js/textures'

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
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.1) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 100)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.2) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 200)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.3) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 300)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.4) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 400)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.5) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 500)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.4) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 600)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.3) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 700)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.2) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 800)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1.1) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 900)
    setTimeout(() => {
      // 初始位置和缩放比例
      panAndZoom(app.renderer.width / 2, app.renderer.height / 2, 1) // 以 (100, 100) 为中心，缩放为 2 倍
    }, 1000)
  }
  panAndZoom222()

  stage.addChild(scene)
}

onMounted(() => {
  init()
})
</script>
