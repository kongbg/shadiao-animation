<template>
  <div class="pannelPeer">
    <el-tabs v-model="panelType" class="demo-tabs">
      <el-tab-pane label="元素属性配置" name="comp">
        <div class="title" v-if="schema && schema.property">
          <div class="label">元素名称：</div>
          <div class="value">
            <el-input v-model="schema.name"></el-input>
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
import { computed, watch, ref, getCurrentInstance } from 'vue'
import { deepClone } from '../utils'
import position from './pannelPeer/position.vue'
import size from './pannelPeer/size.vue'
import scale from './pannelPeer/scale.vue'
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
    return drawStore.panelType || 'comp'
  },
  set(val) {
    drawStore.setDataByName('panelType', val)
  }
})

const schema = ref({})
watch(
  () => schema.value.property,
  (newValue, oldValue) => {
    // console.log('watch 已触发', newValue)
    let params = {
      id: confInfo.value.id,
      options: transformOptions(newValue)
    }
    // 将schema格式参数转换为pixi.js 格式参数
    function transformOptions(options = {}) {
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
            let value = ''
            if (key2 == 'scale') {
              value = {
                x: info[key2].value,
                y: info[key2].value
              }
            } else {
              value = info[key2].value
            }

            if (value != 'auto') {
              obj[key2] = value
            }
          }
        }
      }
      return obj
    }

    // console.log('属性有变动', params)
    panelPeerChange({ action: 'propertyChange', data: params })
  },
  { deep: true }
)

const confInfo = ref({})

Bus.$on('spriteClick', (data) => {
  confInfo.value = data
  schema.value = data.schema
})

Bus.$on('updateProperty', (options) => {
  // 将pixi.js格式参数转换为schema 格式参数
  for (const key in schema.value.property) {
    for (const key2 in schema.value.property[key].value) {
      schema.value.property[key].value[key2].value = options[key2]
    }
  }
})

let compMap = {
  position,
  size,
  scale,
  face,
  head,
  body,
  speak,
  child,
  'move-translate': moveTranslate
}

const activeNames = computed(() => {
  return schema && schema.value.property
    ? Object.keys(schema.value.property).filter(
        (key) => schema.value.property[key].show
      )
    : []
})

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
