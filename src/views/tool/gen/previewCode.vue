<template>
  <!-- 创建表 -->
  <el-dialog
    title="预览代码"
    v-model="visible"
    width="80%"
    top="5vh"
    append-to-body
    class="scrollbar preview-code"
  >

  <el-tabs v-model="activeTab" :class="[ type == 1 ? 'hide' :'']">
    <el-tab-pane
      v-for="item in code"
      :label="item.tabName"
      :name="item.name"
      :key="item.name"
    >
    
      <el-tabs v-model="activeTab2">
        <el-tab-pane
          v-for="(value, key) in item.code"
          :label="key"
          :name="key"
          :key="value"
        >
          <el-link
            :underline="false"
            icon="DocumentCopy"
            v-copyText="value"
            v-copyText:callback="copyTextSuccess"
            style="float: right"
            >&nbsp;复制</el-link
          >
          <pre>{{ value }}</pre>
        </el-tab-pane>
      </el-tabs>

    </el-tab-pane>
  </el-tabs>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="visible = false">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch } from 'vue';

const visible = ref(false)
const activeTab = ref('')
const activeTab2 = ref('')


const props = defineProps({
  code: {
    type: Array,
    default: ()=>[]
  },
  type: {
    type: String,
    default: ''
  }
})

watch(()=>props.code, ()=>{
  console.log('visible:', visible.value)
  init()
})

function init() {
  if(props.code.length) {
    activeTab.value = props.code[0].name
    activeTab2.value = 'api'
  }
}

/** 显示弹框 */
function show() {
  visible.value = true
}

defineExpose({
  show
})
</script>

<style lang="scss">
.preview-code {
  .el-dialog__body {
    height: 600px;
    overflow: hidden !important;
    .el-tabs__content {
      height: 500px;
      overflow: auto;
    }
  }

  .hide>.el-tabs__header {
    margin: 0;
    height: 0;
  }
}
</style>