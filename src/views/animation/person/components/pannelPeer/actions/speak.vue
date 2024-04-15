<template>
  <div class="item center">
    <div class="content-label">内容：</div>
    <el-select
      v-model="props.customData.contentId"
      placeholder="请选择文案"
      style="width: 240px"
      @change="change"
    >
      <el-option
        v-for="item in content"
        :key="item.id"
        :label="`${item.content}`"
        :value="item.id"
      >
        <span>{{ item.speak }}：{{ item.content }}</span>
      </el-option>
    </el-select>
  </div>
  <div class="item center">
    <div class="content-label">延时：</div>
    <el-input class="" v-model="props.customData.delay" placeholder="">
      <template #append>秒</template> </el-input
    >或者
  </div>
  <div class="item center">
    <div class="content-label">提前：</div>
    <el-input class="" v-model="props.customData.ahead" placeholder="">
      <template #append>秒</template> </el-input
    >并在
  </div>
  <div class="item center">
    <div class="content-label">动画时间：</div>
    <el-input
      class="duration"
      disabled
      v-model="props.customData.duration"
      placeholder=""
    >
      <template #append>秒</template>
    </el-input>
  </div>
</template>
<script setup>
import useDrawStore from '@/store/modules/draw'
let drawStore = useDrawStore()

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  customData: {
    type: Object,
    default: () => {}
  },
  content: {
    type: Array,
    default: () => []
  }
})
const change = (id) => {
  let info = props.content.find((item) => item.id == id)
  if (info) {
    props.customData.content = info.content

    let info2 = drawStore.audios[id]
    if (info2) {
      props.customData.audioUrl = info2.url
      props.customData.duration = info2.duration
    }
  }
}
</script>
