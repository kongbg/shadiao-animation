<template>
  <div class="donghua-warp">
    <div ref="pixiContainer"></div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Application, Loader, Sprite, AnimatedSprite, Texture } from 'pixi.js'
import { setTextures, getTextures } from './js/textures'

let app = ref(null)
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
  let resources = await loaderResource(urls)

  // 缓存资源
  cacheTextures(resources)

  // 创建舞台
  app.value = new Application({
    width: window.innerWidth, //800,
    height: window.innerHeight //600,
    // backgroundColor: 0x1099bb
  })

  let stage = app.value.stage

  pixiContainer.value.appendChild(app.value.view)

  let sprite1 = Sprite.from(getTextures('1'))

  stage.addChild(sprite1)

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
  stage.addChild(animatedSprite)

  let sprite2 = Sprite.from(getTextures('2'))
  sprite2.position.set(290, 297)

  stage.addChild(sprite2)

  let sprite3 = Sprite.from(getTextures('3'))

  stage.addChild(sprite3)
  animatedSprite.play()

  // stage.removeChild(sprite1)
  // stage.removeChild(sprite2)
  // stage.removeChild(sprite3)
}

onMounted(() => {
  init()
})
</script>
