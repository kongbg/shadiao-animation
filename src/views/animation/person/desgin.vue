<template>
  <div class="donghua__warpper">
    <sideBar
      class="sideBar"
      @create="(data) => Bus.$emit('createCopm', data)"
    ></sideBar>
    <content ref="contentRef" :id="id" @change="contentChange"></content>
    <panelPeer class="pannelPeer" @change="panelPeerChange"></panelPeer>
  </div>
</template>
<script setup>
import sideBar from './components/sideBar.vue'
import panelPeer from './components/panelPeer.vue'
import content from './components/content.vue'
import Bus from './utils/bus'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

function panelPeerChange({ action, data }) {
  switch (action) {
    case 'hoverComp':
      Bus.$emit('hoverComp', data.compId)
      break
    case 'propertyChange':
      // console.log('属性有变动', data)
      Bus.$emit('updateSprite', data)
      break
  }
}

function contentChange({ action, data }) {
  switch (action) {
    case 'spriteClick':
      Bus.$emit('spriteClick', data)
      break
    case 'updateProperty':
      Bus.$emit('updateProperty', data)
      break
  }
}

let contentRef = ref(null)
function getSchemas() {
  return contentRef.value.getSchemas()
}
defineExpose({
  getSchemas
})
</script>

<style lang="scss" scoped>
.donghua__warpper {
  width: 100%;
  // height: calc(100vh - 60px);
  display: flex;
  //justify-content: space-between;

  .sideBar {
    width: 340px;
    height: 100%;
    border-right: 1px solid #eee;
    flex-shrink: 0;
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
    flex-shrink: 0;
  }
}
</style>
