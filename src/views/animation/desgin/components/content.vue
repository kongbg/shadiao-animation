<template>
  <div class="donghua__warpper">
    <div class="main">
      <div ref="canvas" class="game" id="game"></div>
      <div class="tools">
        <div id="play" @click="start">play</div>
        <div class="undo" @click="undo">撤回</div>
        <div class="redo" @click="redo">重做</div>
        <div class="redo" @click="create">新增人物</div>
        <div class="redo" @click="exportToJson2">导出视频Json</div>
        <div class="redo" @click="exportToJson">导出Json</div>
        <div class="redo" @click="save">保存</div>
      </div>
      <timeline></timeline>
    </div>
  </div>
</template>
<script setup>
import timeline from './timeline.vue'
import { ref, nextTick, reactive, computed } from 'vue'
import Stage from '../js/stage'
import Bus from '../utils/bus'
import { deepClone, generateUniqueID } from '../utils'
import useDrawStore from '@/store/modules/draw'
import { exportVideo, updateVideo } from '../api/video/index.js'

import History from '../js/history'
const history = new History()
let drawStore = useDrawStore()

const canvas = ref(null)
let width = 960
let height = 540

Bus.$on('createCopm', (data) => {
  create(data)
})
Bus.$on('timelineChange', (options) => {
  let name = `emptyScene${options.data.id}`
  initStage(name, options.destroy)
})
Bus.$on('hoverComp', (id) => {
  app.setSpriteLineHeight(id)
})
Bus.$on('updataComp', (data) => {
  app.updataComp(data.id, data.options)
})
Bus.$on('removeComp', (comp) => {
  removeCompFromDrawConfigs(comp)
})

let configs = computed(() => {
  return drawStore.drawConfigs.confs
})

// const scale = `scale(${
//   window.innerHeight < window.innerWidth
//     ? window.innerHeight / height
//     : window.innerWidth / width
// })`;
let ids = [
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID(),
  generateUniqueID()
]
let configs_back = reactive([
  // {
  //     id: generateUniqueID(),
  //     name: 'emptyScene1',
  //     type: 'collect',
  //     option: {
  //         title: '第一集',
  //         duration: 1000,
  //         comps: [],
  //         actions: []
  //     }
  // },
  {
    id: generateUniqueID(),
    name: 'emptyScene2',
    type: 'scene',
    option: {
      title: '第二集',
      duration: 3600000,
      comps: [
        {
          id: ids[0],
          type: 'background',
          name: '背景',
          url: 'http://127.0.0.1:3000/uploads/images/cqn1oqwk.jpeg',
          width: 630,
          height: 408,
          x: 100,
          y: 100
        },
        {
          id: ids[1],
          type: 'person',
          name: '叶凡',
          width: 100,
          height: 100,
          x: 200,
          y: 200,
          // anchor: 0.5,
          children: [
            {
              id: generateUniqueID(),
              type: 'head',
              name: '头',
              scaleX: -1,
              width: 60,
              height: 53,
              x: 0,
              y: 0,
              url: 'http://127.0.0.1:3000/uploads/images/kvo8ltmt.png'
            },
            {
              id: generateUniqueID(),
              type: 'body',
              name: '身体',
              width: 78,
              height: 90,
              x: 0,
              y: 27,
              url: 'http://127.0.0.1:3000/uploads/images/4294i56q.png'
            },
            {
              id: generateUniqueID(),
              type: 'face',
              name: '表情',
              width: 25,
              height: 25,
              x: 10,
              y: 20,
              url: 'http://127.0.0.1:3000/uploads/images/4nxzfz9h.png'
            }
          ]
        },
        {
          id: ids[2],
          type: 'person',
          name: '路人',
          width: 100,
          height: 100,
          x: 300,
          y: 300,
          children: [
            {
              id: generateUniqueID(),
              type: 'head',
              name: '头',
              width: 60,
              height: 53,
              x: 0,
              y: 0,
              url: 'http://127.0.0.1:3000/uploads/images/kvo8ltmt.png'
            },
            {
              id: generateUniqueID(),
              type: 'body',
              name: '身体',
              width: 60,
              height: 67,
              x: 0,
              y: 49,
              url: 'http://127.0.0.1:3000/uploads/images/8f9akz5v.png'
            },
            {
              id: generateUniqueID(),
              type: 'face',
              name: '表情',
              width: 25,
              height: 25,
              x: 12,
              y: 20,
              url: 'http://127.0.0.1:3000/uploads/images/4nxzfz9h.png'
            }
          ]
        }
      ],
      actions: []
    }
  }
])

let app = null

function start() {
  app.start()
}

function undo() {
  history.undo()
}
function redo() {
  history.redo()
}
function create(data) {
  debugger
  if (!app) return
  let obj = deepClone(data)
  obj.id = generateUniqueID()

  if (obj.children) {
    obj.children.forEach((item) => {
      item.id = generateUniqueID()
    })
  }

  obj.history = history
  obj.screen = {
    width: app.width,
    height: app.height
  }
  // 往舞台中新增元素
  app.addComp(obj)
  // 往web页面变量中新增元素
  addCompInDrawConfigs(obj)
}
// 往web页面变量中新增元素
function addCompInDrawConfigs(obj) {
  let confs = drawStore.drawConfigs.confs
  for (let i = 0; i < confs.length; i++) {
    if (confs[i].id == configId.value) {
      confs[i].option.comps.push(obj)
      break
    }
  }
}
// 往web页面变量中删除元素
function removeCompFromDrawConfigs(comp) {
  let confs = drawStore.drawConfigs.confs
  for (let i = 0; i < confs.length; i++) {
    if (confs[i].id == configId.value) {
      let comps = confs[i].option.comps
      for (let j = 0; j < comps.length; j++) {
        if (comps[j].id == comp.id) {
          comps.splice(j, 1)
          break
        }
      }
    }
  }
}
function exportToJson() {
  console.log('stage:', stage)

  let jsonData = getProperty([stage.stage])
  console.log('jsonData:', jsonData)

  function getProperty(stage) {
    let jsonData = stage.map((rectangle) => {
      let obj = {
        type: rectangle.type,
        id: rectangle.id,
        name: rectangle.name,
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height,
        color: rectangle.color,
        rotation: rectangle.rotation,
        scaleX: rectangle.scale.x,
        scaleY: rectangle.scale.y
      }
      if (rectangle.children) {
        obj.children = getProperty(rectangle.children)
      }
      return obj
    })
    return jsonData
  }
}
function exportToJson2() {
  console.log('drawStore:', drawStore.drawConfigs)
  let configs = drawStore.drawConfigs.confs.map((item) => {
    return {
      id: item.id,
      name: item.name,
      type: 'scene',
      option: {
        title: item.option.title,
        comps: item.option.comps,
        actions: item.option.actions
      }
    }
  })
  console.log('configs:', configs)
  // console.log('configs:', JSON.stringify(configs, null, 2))
}
async function save() {
  let res = await updateVideo(drawStore.drawConfigs)
}
let configId = ref('')
async function initStage(name, destroy = false) {
  // 删除旧舞台
  if (app && destroy) {
    app.destroy()
    app = null
  }

  if (!app) {
    // 创建新舞台
    await nextTick(async () => {
      app = await new Stage({
        width,
        height,
        el: canvas.value,
        resolution: 1,
        configs: configs.value,
        history: history,
        async drop(id, purpose, options) {
          console.log(id, purpose, options)
          const schema = deepClone(
            (await import(`./common/${purpose}/schema.json`)).default
          )
          console.log(schema)
          schema.id = id
          schema.property.position.value.x.value = options.x || 0
          schema.property.position.value.y.value = options.y || 0
          schema.property.position.value.zIndex.value = options.zIndex || 11
          if (schema.children) {
            schema.children.forEach((item) => {
              // schema.property.children[item.type].value.height.value = item.
            })
          }
          options.schema = schema
          create(options)
        },
        onProgress: (n) => {
          Bus.$emit('changeProgress', n)
        }
      }).init()
    })
  }

  if (name) {
    configId.value = name.replace('emptyScene', '')
    if (app) app.changeScene(name)
  }
}
</script>

<style lang="scss" scoped>
.donghua__warpper {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: space-between;

  .sideBar {
    width: 300px;
    height: 100%;
    border-right: 1px solid #eee;
  }

  .content {
    // width: calc(100% - 0px);
    height: 100%;
    overflow: hidden;
  }

  .pannelPeer {
    width: 400px;
    height: 100%;
    border-left: 1px solid #eee;
  }
}
.app-container {
  display: flex;
}
.game {
  // transform: v-bind(scale);
  cursor: none;
}
.tools {
  display: flex;
}
#play,
.redo,
.undo {
  //   position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  color: #000;
  width: 100px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
  margin-right: 10px;
  //   opacity: 0;
}
</style>
