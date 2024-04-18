<template>
  <div class="donghua-warp">
    <div ref="pixiContainer"></div>
    <div class="btns">
      <!-- <el-button type="primary" @click="saveSchema">保存</el-button> -->
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { deepClone, generateUniqueID, throttle } from '../utils'
import { getLists } from '../api/schema/index.js'
import Bus from '../utils/bus'
import Stage from './js/stage'

const { proxy } = getCurrentInstance()

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

watch(
  () => props.id,
  () => {
    console.log('content:', props.id)
    init()
  }
)

let stage = ref(null)
const pixiContainer = ref(null)

const config = ref([
  // {
  //   type: 'head',
  //   id: '1',
  //   name: '头1',
  //   url: 'http://127.0.0.1:3006/uploads/images/head/l27un4ev.png'
  // }
  // {
  //   type: 'body',
  //   id: '2',
  //   name: '躯干1',
  //   url: 'http://127.0.0.1:3006/uploads/images/body/2mhmm3dh.png',
  //   x: 0,
  //   y: 73
  // },
  // {
  //   type: 'face',
  //   id: '3',
  //   name: '表情1',
  //   url: 'http://127.0.0.1:3006/uploads/images/face/cdrd3v6s.png',
  //   x: 15,
  //   y: 25,
  //   scale: 0.4
  // }
])

Bus.$on('updateSprite', (data) => {
  stage.value.updateSprite(data.id, data.options)
})

// 获取schema
async function getSchema(type) {
  const schema = (await import(`./common/${type}/schema.json`)).default
  return deepClone(schema)
}

let schemas = ref([])
async function getConfigs() {
  let params = {
    id: props.id
  }
  schemas.value = []
  config.value = []
  let res = await getLists(params)
  let { code, data, msg } = res
  if (code == 200) {
    if (data.data.length) {
      let schema = data.data[0].schema
      schemas.value = JSON.parse(schema)
    }
  }

  schemas.value.forEach((item) => {
    let property = transformOptions(item.property)
    config.value.push({
      type: item.type,
      id: item.id || generateUniqueID(),
      name: item.name,
      ...property,
      schema: item
    })
  })
}
function createConf(item) {
  let property = transformOptions(item.property)
  return {
    type: item.type,
    id: item.id || generateUniqueID(),
    name: item.name,
    ...property,
    schema: item
  }
}
// 将schema格式参数转换为pixi.js 格式参数
function transformOptions(options) {
  options = deepClone(options)
  let obj = {}
  for (const key in options) {
    let info = {}
    if (key == 'children') {
      obj[key] = {}
      let children = options[key].children
      for (const key2 in children) {
        let temp = {}
        temp[key2] = children[key2]
        obj[key][key2] = transformOptions(temp)
      }
    } else {
      info = options[key].value
      for (const key2 in info) {
        let value = info[key2].value
        if (value != 'auto') {
          obj[key2] = value
        }
      }
    }
  }
  return obj
}
function saveSchema() {
  console.log('saveSchema:', schemas.value)
}

function getSchemas() {
  schemas.value.sort((a, b) => {
    return (
      a.property.position.value.zIndex.value -
      b.property.position.value.zIndex.value
    )
  })
  return schemas.value
}

async function handleDrop(id, purpose, options) {
  let schema = await getSchema(purpose)
  schema.id = id
  schema.property.position.value.x.value = options.x || 0
  schema.property.position.value.y.value = options.y || 0
  schema.property.position.value.zIndex.value = options.zIndex || 11
  schema.property.image.value.url.value = options.url || ''

  schemas.value.push(schema)

  let conf = createConf(schema)
  // 把之前的标记为已创建，调用initConfig时才不重复创建
  config.value.forEach((item) => (item.inited = true))

  config.value.push(conf)
  // 更新舞台
  stage.value.uptateStage()
}

const throttleFn = throttle(handleDrop, 200)

async function init() {
  debugger
  if (stage.value) {
    stage.value.destroy()
    stage.value = null
  }

  // 如果是编辑，先从数据库获取配置
  if (props.id) {
    await getConfigs()
  }

  stage.value = new Stage({
    el: pixiContainer.value,
    config: config.value,
    drop: throttleFn,
    pointerdown(event) {
      let { id, purpose } = event.currentTarget
      let info = config.value.find((item) => item.id == id)
      // 点击精灵，将schema传给panelPeer
      proxy.$emit('change', {
        action: 'spriteClick',
        data: {
          id,
          purpose,
          schema: info?.schema || {}
        }
      })
    },
    pointermove(event) {
      let currentTarget = event.currentTarget
      let options = {}
      let propertys = ['width', 'height', 'x', 'y', 'zIndex', 'scale', 'url']
      // 从pixi中获取所需要的属性值
      for (let i = 0; i < propertys.length; i++) {
        const key = propertys[i]
        if (key == 'scale') {
          options[key] = currentTarget[key].x
        } else {
          options[key] = currentTarget[key]
        }
      }
      proxy.$emit('change', {
        action: 'updateProperty',
        data: options
      })
    },
    removeSprite(id) {
      for (let i = 0; i < config.value.length; i++) {
        if (config.value[i].id == id) {
          config.value.splice(i, 1)
          schemas.value.splice(i, 1)
          break
        }
      }
    }
  })
}

defineExpose({
  getSchemas
})

onMounted(() => {
  init()
})
</script>
<style lang="scss">
.donghua-warp {
  // display: flex;
}
</style>
