<script setup>
import { ref, nextTick } from "vue";
import Game from "./js";
import Bus from "../../utils/bus";
import { exportVideo } from '@/api/video/index.js'

const canvas = ref(null);
let width = 800;
let height = 600;

// const scale = `scale(${
//   window.innerHeight < window.innerWidth
//     ? window.innerHeight / height
//     : window.innerWidth / width
// })`;


nextTick(() => {
  new Game({
    width,
    height,
    el: canvas.value,
    resolution: 1,
    onProgress: n => {
      Bus.$emit("changeProgress", n);
    }
  }).init();
});

// 导出视频
async function exportVideos() {
  let params = {
    url: 'http://localhost/index'
  }
  await exportVideo(params)
}

</script>

<template>
  <el-button @click="exportVideos">导出视频</el-button>
  <div ref="canvas" class="game"></div>
</template>

<style lang="scss" scoped>
.game {
  // transform: v-bind(scale);
  cursor: none;
}
</style>
