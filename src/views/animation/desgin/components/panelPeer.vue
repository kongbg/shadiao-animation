<template>
  <div class="pannelPeer">
    <el-tabs v-if="currentConfInfo" v-model="panelType" class="demo-tabs">
      <el-tab-pane label="场景配置" name="page">
        <div class="title" v-if="!isEmpty">
          <div class="label">场景名称：</div>
          <div class="value">
            <el-input v-model="currentConfInfo.name" disabled />
          </div>
        </div>
        <div class="actions">
          <el-collapse class="collapse" v-model="sceneAction">
            <el-collapse-item class="item__warpper" title="动作" name="action">
              <div
                class="action"
                v-for="(act, index) in currentConfInfo.option.actions"
              >
                <!-- {{ act.id }} -->
                <el-icon class="delete" @click="removeAction(index)">
                  <DeleteFilled />
                </el-icon>

                <div v-for="(item, ai) in act.actions">
                  <!-- {{ item.id }} -->
                  <div v-if="ai > 0">同时执行：</div>

                  <div class="tbaction">
                    <el-icon class="tb-delete" @click="removeAction2(ai, act)">
                      <DeleteFilled />
                    </el-icon>
                    <div class="item">
                      <div class="content-label">目标：</div>
                      <el-select
                        v-model="item.target"
                        placeholder="请选择页面上的元素"
                        style="width: 240px"
                        @change="(id) => change(id, item.id)"
                      >
                        <el-option
                          v-for="copm in currentConfInfo.option.comps"
                          :key="copm.id"
                          :label="copm.schema.name || copm.name"
                          :value="copm.id"
                          @mouseover="hover(copm.id)"
                        />
                      </el-select>
                    </div>

                    <div
                      :class="[
                        'action-wrap',
                        info.id == drawStore.editActionId ? 'isActive' : ''
                      ]"
                      v-for="(info, index3) in item.actions"
                      @click="editAction(info.id)"
                    >
                      <!-- {{ info.id }} -->
                      <div class="item">
                        <div class="content-label">动作：</div>
                        <el-cascader
                          v-model="info.type"
                          :options="getActionTypes(item.target)"
                          :props="{ expandTrigger: 'hover' }"
                        />
                        <el-icon
                          class="add-action"
                          @click="addAction3(item.actions, index3, info)"
                        >
                          <CirclePlusFilled />
                        </el-icon>
                        <el-icon
                          v-show="index3 > 0"
                          @click="removeAction3(index3, item)"
                          ><DeleteFilled
                        /></el-icon>
                      </div>
                      <component
                        :is="compMap[info.type.join('-')]"
                        :content="currentConfInfo.option.content"
                        :customData="info"
                        :name="schema.name"
                      ></component>
                    </div>
                  </div>
                </div>

                <el-button type="primary" size="small" @click="addAction2(act)"
                  >新增同步动作</el-button
                >
              </div>
              <el-button
                class="add-btn"
                type="primary"
                size="small"
                @click="addAction"
                >新增异步动作</el-button
              >
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="元素属性配置" name="comp">
        <div class="title" v-if="!isEmpty">
          <div class="label">元素名称：</div>
          <div class="value">
            <el-select
              v-model="schema.nameId"
              placeholder="请选择页面上的元素"
              style="width: 240px"
              @change="(id) => compNameChange(id)"
            >
              <el-option
                v-for="copm in speaks"
                :key="copm.id"
                :label="copm.name"
                :value="copm.id"
              />
            </el-select>
          </div>
        </div>
        <div class="propertys">
          <el-collapse class="collapse" v-model="activeNames">
            <el-collapse-item
              class="item__warpper"
              :title="item.name"
              :name="index"
              v-for="(item, index) in schema.property"
              :key="index"
              v-show="item.show || item.show == undefined"
            >
              <component
                v-if="item.show || item.show == undefined"
                :is="compMap[item.type]"
                :compData="item.value"
                :children="item.children"
              >
              </component>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import useDrawStore from '@/store/modules/draw'
import {
  computed,
  watch,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance
} from 'vue'
import { deepClone, generateUniqueID } from '../utils'
import position from './pannelPeer/position.vue'
import size from './pannelPeer/size.vue'
import image from './pannelPeer/image.vue'
import face from './pannelPeer/face.vue'
import speak from './pannelPeer/actions/speak.vue'
import head from './pannelPeer/head.vue'
import body from './pannelPeer/body.vue'
import child from './pannelPeer/child.vue'
import moveTranslate from './pannelPeer/actions/move-translate.vue'
import Bus from '../utils/bus'

const { proxy } = getCurrentInstance()

let drawStore = useDrawStore()
// 属性面板当前展示分类
const panelType = computed({
  get() {
    return drawStore.panelType || 'page'
  },
  set(val) {
    drawStore.setDataByName('panelType', val)
  }
})

const schema = ref({})
watch(
  () => schema.value.property,
  (newValue, oldValue) => {
    console.log('watch 已触发', newValue)

    let params = {
      id: confInfo.value.id,
      options: transformOptions(deepClone(newValue))
    }
    // 将schema格式参数转换为pixi.js 格式参数
    function transformOptions(options) {
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

    console.log('属性有变动', params)
    panelPeerChange({ action: 'propertyChange', data: params })
  },
  { deep: true }
)

const confInfo = ref({})
const speaks = computed(() => {
  let speak = drawStore.drawConfigs.speaks
  let speaks = []
  for (const key in speak) {
    speaks.push({
      ...speak[key]
    })
  }
  return speaks || []
})
const isEmpty = computed(() => {
  return Object.keys(schema.value || {}).length === 0
})

Bus.$on('selectComp', (data) => {
  // console.log('selectComp:', data)
})
Bus.$on('compChange', (data) => {
  debugger
  let id = currentConfInfo.value.id
  let conf = drawStore.drawConfigs.confs.find((item) => item.id == id)

  let info = conf.option.comps.find((item) => item.id == data.id)
  if (info) {
    info = Object.assign(info, data)
  }

  panelType.value = 'comp'
  confInfo.value = info || {}
  schema.value = info.schema || {}

  console.log('schema:', schema.value, data)
  schema.value.property.position.value.x.value = data.x
  schema.value.property.position.value.y.value = data.y
  schema.value.property.size.value.width.value = data.width
  schema.value.property.size.value.height.value = data.height
})

let currentConfInfo = ref(null)

Bus.$on('timelineChange', (options) => {
  currentConfInfo.value =
    drawStore.drawConfigs.confs[drawStore.currentConfIndex]
})

let compMap = {
  position,
  size,
  image,
  face,
  head,
  body,
  speak,
  child,
  'move-translate': moveTranslate
}

function compNameChange(id) {
  let info = speaks.value.find((item) => item.id == id)
  schema.value.name = info.name
  confInfo.value.name = info.name
}

const sceneAction = ref(['action'])

const activeNames = computed(() => {
  return schema && schema.value.property
    ? Object.keys(schema.value.property).filter(
        (key) => schema.value.property[key].show
      )
    : []
})

// easing: 'linear', // 时间曲线，匀速
// duration: 2000, // 全局动画时间，局部优先级高
// autoplay: false, // 关闭自动播放
// targets: `#comp-${info.target}`, // 目标
let actionObj = {
  id: '', // 动画事件id
  target: '', // 动画元素id

  actions: [
    {
      id: '',
      contentId: '',
      content: '',
      type: [], // 动画类型
      duration: 0,
      easing: 'linear'
    }
  ]
}
// 新增异步动作
const addAction = (textInfo = {}, delay = 0) => {
  let obj = deepClone(actionObj)
  obj.id = generateUniqueID()
  obj.actions[0].id = generateUniqueID()
  currentConfInfo.value.option.actions.push({
    id: generateUniqueID(),
    actions: [obj]
  })
}
// 删除异步动作
const removeAction = (index) => {
  currentConfInfo.value.option.actions.splice(index, 1)
}
// 新增同步动作
const addAction2 = (data) => {
  let obj = deepClone(actionObj)
  obj.id = generateUniqueID()
  obj.actions[0].id = generateUniqueID()
  data.actions.push(obj)
}
// 删除同步动作
const removeAction2 = (index, data) => {
  data.actions.splice(index, 1)
}
// 新增动作
const addAction3 = (data, index, preNode) => {
  let obj = {
    id: generateUniqueID(),
    contentId: '',
    content: '',
    type: [], // 动画类型
    duration: 0,
    ahead: preNode.duration,
    easing: 'linear'
  }
  data.splice(index + 1, 0, obj)
}
// 删除动作
const removeAction3 = (index, data) => {
  data.actions.splice(index, 1)
}

// 编辑该动作
const editAction = (id) => {
  drawStore.setDataByName('editActionId', id)
}

const getActionTypes = (id) => {
  let info = currentConfInfo.value.option.comps.find((item) => item.id == id)
  if (info) {
    return info.schema.actionTypes
  } else {
    return []
  }
}

const change = (compId, actionId) => {
  drawStore.setDataByName('tempTargetId', compId)
  drawStore.setDataByName('tempActionId', actionId)
}
// 鼠标悬浮在元素名称上，舞台中元素高亮提示
const hover = (compId) => {
  panelPeerChange({ action: 'hoverComp', data: { compId } })
}

// 属性面板中的任何事件，统一通过该方法抛出
function panelPeerChange(options) {
  if (!options.action) {
    console.warn('请定义action')
    return
  }
  proxy.$emit('change', { ...options })
}
</script>

<style lang="scss" scoped>
.pannelPeer {
  padding: 10px;
  overflow: auto;

  .top-tabs {
    height: 100%;
    .el-tabs__content {
      height: calc(100% - 64px);
      overflow: auto;
    }
  }

  .propertys {
    margin-top: 10px;
  }

  .actions {
    .collapse {
      .item__warpper {
        .tbaction {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 5px;
          margin-bottom: 10px;
          position: relative;
          .tb-delete {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 99;
            cursor: pointer;
          }
        }
        .action-wrap {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 5px;
          margin-bottom: 10px;
          .add-action {
            font-size: 20px;
            margin-left: 5px;
            cursor: pointer;
          }
          &.isActive {
            border-color: #409eff;
          }
        }
        .action {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 10px;
          position: relative;
          .delete {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 100;
            cursor: pointer;
          }
          .item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            .content-label {
              width: 94px;
            }

            .select {
              display: inline-block;
            }
            .textarea {
              display: inline-block;
            }
            .duration-txt {
              width: 100px;
            }
            &.move {
              .move-item {
                display: flex;
                align-items: center;
              }
            }
            &.center {
              align-items: center;
            }
          }
        }
        .add-btn {
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
