<template>
    <div :class="['backgroundImg', isEmpty ? 'empty':'']" :style="customStyle">
      <!-- <div v-if="isEmpty" class="tips">请拖入背景</div> -->
    </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { speak, sleep, getImgUrl } from "../../utils";

const props = defineProps({
  compData: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  }
});

let customStyle = computed(()=>{
  let url = props.compData.schema.property.background.value.image.url;
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundImage: `url('${getImgUrl(url)}')`,
    backgroundSize: '100% 100%'
  }
})


// 是否为空
const isEmpty = computed(() => {
  return true//!props.compData.property.background.value.image.url;
});
defineExpose({
  run
})
function run () {
  return new Promise(async (resolve, reject) => {
    await doAction();
    resolve(true);
  })
}

async function doAction() {
  let actions = props.compData.schema.actions || [];
  let list = [];
  actions.forEach(item => {
    let p = new Promise(async (resolve, reject) => {
      if (item.type.length == 1 && item.type[0] === 'speak') {
        await speak(item.content.content);
      }
      resolve(true);
    })
    list.push(p)
  })
  await Promise.all(list);
}

</script>

<style lang="scss" scoped>
    .backgroundImg {
      overflow: hidden;
      &.empty {
        background: #eee;
        .tips {
          text-align: center;
          margin-top: 50px;
        }
      }
    }
</style>