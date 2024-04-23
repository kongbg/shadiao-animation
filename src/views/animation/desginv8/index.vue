<template>
    <div class="donghua-warp">
      <div ref="pixiContainer"></div>
    </div>
</template>
<script setup>
import { onMounted } from "vue"
import { Application, Loader } from 'pixi.js'
import {setTextures, getTextures} from './js/textures'


let stage = ref(null)
const pixiContainer = ref(null)

let urls = [
    {
        key: '1',
        value: 'https://g.mdcdn.cn/h5/img/act/201711/new-1-1.jpg'
    }
]


// 预加载资源
async function loaderResource(urls) {
    let loader = new Loader();
    return new Promise((resolve, reject) => {
      urls.forEach(item =>{
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

    // 缓存资源
    this.cacheTextures(resources)
    // 创建舞台
    stage.value = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb
    })

    pixiContainer.value.appendChild(stage.value.view)
}

onMounted(()=>{
    init()
})
</script>
