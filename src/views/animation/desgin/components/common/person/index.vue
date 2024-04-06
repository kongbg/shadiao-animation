<template>
    <div :class="['person', isEmpty ? 'empty':'']" @dragover="(e)=>dragover(e, drawStore.dragElType)" @drop="drop" :style="customStyle">
        <div v-if="isEmpty" class="default-body"></div>
        <div v-if="!isEmpty" :id="`person-${props.compData.id}`">
          <div :id="`head-warp-${props.compData.id}`">
            <div :id="`head-${props.compData.id}`" class="head" :style="headStyle">
              <div :id="`face-${props.compData.id}`" :ref="`face-${props.compData.id}`" class="face" :style="faceStyle"></div>
            </div>
          </div>
          <div :id="`body-${props.compData.id}`" class="body" :style="bodyStyle"></div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, inject, getCurrentInstance, defineEmits } from "vue";
import { speak, sleep } from "../../utils";
import { getImgUrl } from '@/utils'
import anime from 'animejs/lib/anime.es.js';
const { proxy } = getCurrentInstance()
import useDrawStore from '@/store/modules/draw';
let drawStore = useDrawStore();
const props = defineProps({
  compData: {
    type: Object,
    default: () => ({})
  }
});

// 是否为空
const isEmpty = computed(() => {
  let {x, y} = props.compData.schema.property.position.value;
  return x.value==0 && y.value==0;
});

function setSize() {
  let sizeInfo = props.compData.schema.property.size?.value;
  let bodyInfo = props.compData.schema.property.body?.value;
  let headInfo = props.compData.schema.property.head?.value;

  let w = bodyInfo.width.value //+ headInfo.width.value;
  let h = bodyInfo.height.value + headInfo.height.value;

  if (sizeInfo.width.value < w ) {
    sizeInfo.width.value = w
  }
  if (sizeInfo.height.value < h) {
    sizeInfo.height.value = h
  }
}
function getImageInfo(imagePath) {
  // 使用正则表达式匹配字符串中的数字
  // /头部宽x头部高x表情宽x表情高x表情x轴坐标x表情y轴坐标x表情x轴偏移x表情y轴偏移/
  let regex = imagePath.indexOf('head') > -1 ? /(\d+)x(\d+)x(\d+)x(\d+)x(\d+)x(\d+)x(\d+)x(\d+)/ : /(\d+)x(\d+)/;
  let matches = imagePath.match(regex);

  if (matches) {
      let width = parseInt(matches[1], 10) || 0;
      let height = parseInt(matches[2], 10) || 0;
      let faceWidth = parseInt(matches[3], 10) || 0;
      let faceHeight = parseInt(matches[4], 10) || 0;
      let faceX = parseInt(matches[5], 10) || 0;
      let faceY = parseInt(matches[6], 10) || 0;
      let faceDix = parseInt(matches[7], 10) || 0;
      let faceDiy = parseInt(matches[8], 10) || 0;
      return {
        width,
        height,
        faceWidth,
        faceHeight,
        faceX,
        faceY,
        faceDix,
        faceDiy
      }
  } else {
      return {
        width: 0,
        height: 0,
        faceWidth: 0,
        faceHeight: 0,
        faceX: 0,
        faceY: 0,
        faceDix: 0,
        faceDiy: 0
      }
  }
}

const customStyle = computed(() => {
  return {
    width: props.compData.schema.property.size.value.width.value + 'px',
    height: props.compData.schema.property.size.value.height.value + 'px'
  }
})

const headStyle = computed(() => {
  let info = props.compData.schema.property.head?.value;
  let url = info.image.value;

  // 未初始化，从图片信息中拿到头部，身体，表情的尺寸定位信息
  if (!props.compData.schema.property.head.inited) {
    let { width, height, faceWidth, faceHeight, faceX, faceY, faceDix, faceDiy } = getImageInfo(url);
    info.x.value = 0;
    info.y.value = faceDiy;
    info.width.value = width;
    info.height.value = height;
    props.compData.schema.property.head.inited = true;
  }

  setSize()

  if (url) {
    return {
      backgroundImage: `url(${getImgUrl(url)})`,
      left: info.x.value + 'px',
      top: info.y.value + 'px',
      width: info.width.value + 'px',
      height: info.height.value + 'px',
      position: 'relative',
    }
  } else {
    return {}
  }
})

const bodyStyle = computed(() => {
  let info = props.compData.schema.property.body?.value;
  let url = info.image.value;

  // 未初始化，从图片信息中拿到头部，身体，表情的尺寸定位信息
  if (!props.compData.schema.property.body.inited) {
    let { width, height, faceWidth, faceHeight, faceX, faceY, faceDix, faceDiy } = getImageInfo(url);
    info.x.value = 0;
    info.y.value = 0;
    info.width.value = width;
    info.height.value = height;
    props.compData.schema.property.body.inited = true;
  }

  setSize();

  if (url) {
    return {
      backgroundImage: `url(${getImgUrl(url)})`,
      left: info.x.value + 'px',
      top: info.y.value + 'px',
      width: info.width.value + 'px',
      height: info.height.value + 'px'
    }
  } else {
    return {}
  }
})

const faceStyle = computed(() => {
  let info = props.compData.schema.property.face?.value;
  let url = info.image.value;

  // 未初始化，从图片信息中拿到头部，身体，表情的尺寸定位信息
  if (!props.compData.schema.property.face.inited) {
    let headUrl = props.compData.schema.property.head?.value.image.value;
    let { width, height, faceWidth, faceHeight, faceX, faceY, faceDix, faceDiy } = getImageInfo(headUrl);
    info.x.value = faceX;
    info.y.value = faceY;
    info.width.value = faceWidth;
    info.height.value = faceHeight;
    props.compData.schema.property.face.inited = true;
  }

  if (url) {
    return {
      backgroundImage: `url(${getImgUrl(url)})`,
      left: info.x.value + 'px',
      top: info.y.value + 'px',
      width: info.width.value + 'px',
      height: info.height.value + 'px'
    }
  } else {
    return {}
  }
})

const dragover = (e, dragElType) => {
  // console.log('222阻止默认事件，允许放置拖拽元素:',e, dragElType)
  let allowType = ['face'];
  if (allowType.includes(dragElType)) {
      e.preventDefault();
  }
  e.stopPropagation(); // 阻止事件冒泡到上层元素
}
const drop = (e) => {
  e.stopPropagation();//阻止冒泡
  // console.log('eee:', e)
  let className = e.target.className
  let targetType = ['head', 'face', 'body'].includes(className) ? 'person' : '';
  let targetId = e.target.id.indexOf('-') > -1 ? e.target.id.split('-')[1] : e.target.id;
  let data =JSON.parse(e.dataTransfer.getData('text/plain'))

  proxy.$emit('change', {
      action: 'update',
      data: {
        targetType,
        targetId,
        sourceType: data.type,
        options: {
          ...data
        }
      }
  })
}

defineExpose({
  run
})

let setAnimate = inject('setAnimate')
function run () {
  // console.log('run-doAction')
  return new Promise(async (resolve, reject) => {
    await doAction();
    resolve(true);
  })
}

initPosition()
function initPosition () {
  let position = props.compData.schema.property.position.value;
  console.log('position',position)
  let { x, y, ox, oy } = position;
  x.value = ox.value;
  y.value = oy.value;
}

async function doAction() {
  let actions = props.compData.schema.actions || [];
  // console.log('run-doAction2:', actions, props.compData)
  let list = [];
  let timer = null;
  let ourl = null;
  actions.forEach(item => {
    let p = new Promise(async (resolve, reject) => {
      // console.log('doAction：',item)
      if (item.type.length == 1 && item.type[0] === 'speak') {
        
        // 摇头
        let shakeHead = anime({
          targets: `#head-${props.compData.id}`,
          translateX: [
            { value: -1, delay: 0, duration: 200 },
            { value: 1, delay: 0, duration: 200 }
          ],
          translateY: [
            { value: 1, delay: 0, duration: 200 },
            { value: -1, delay: 0, duration: 200 }
          ],
          easing: 'linear',
          autoplay: false,
          loop: true
        });
        // // 转头
        // let scaleHead = anime({
        //   targets: `#head-warp-${props.compData.id}`,
        //   scaleX: [
        //     { value: -1, duration: 0, delay: 1500 },
        //     { value: 1, duration: 0, delay: 1500 }
        //   ],
        //   easing: 'linear',
        //   autoplay: false,
        //   loop:  Math.floor(Math.random() * 6)
        // });
        if (item.shakeHead) {
          setTimeout(() => {
            shakeHead.play()
          }, item.delay * 1000)
          
        };
        // if (item.scaleHead) scaleHead.play();

        // // 随机表情
        // if (item.randomFace) {
        //   let url = props.compData.schema.property.face?.value.image.value;
        //   ourl = url;
        //   timer = setInterval(()=> {
        //     // console.log('随机表情:', url)
        //     let newUrl = url.replace(/(\d+)\.png/, `${Math.floor(Math.random() * 10)}.png`);
        //     // console.log('随机表情:', newUrl, ourl)
        //     props.compData.schema.property.face.value.image.value = newUrl;
        //   }, 1000)
        // }

        // 全身 左右翻转
        // let person = anime({
        //   targets: `#person-${props.compData.id}`,
        //   keyframes: [
        //     {scaleX: 1, delay: 1500},
        //     {scaleX: -1, delay: 1500},
        //   ],
        //   duration: 0,
        //   easing: 'linear',
        //   autoplay: false,
        //   loop: true
        // });
        // if (item.scaleBody) person.play();
        setTimeout(async ()=>{
          await speak(item.content.content);
        }, item.delay * 1000)


        clearInterval(timer);
        props.compData.schema.property.face.value.image.value = ourl;
        shakeHead.restart();
        shakeHead.pause();
        // person.restart();
        // person.pause();
        // scaleHead.pause();
      }
      if (item.type.length > 1 && item.type[0] === 'move') {
        if (item.type[1] === 'translate') {
          await setAnimate(
            {
              left: `${item.x}px`,
              top: `${item.y}px`
            },
            {
              duration: item.duration * 1000,// 动画时长 (单位毫秒)
              easing: 'linear', // 设置动画 运动速率 [esse(默认)：慢-快-慢 ，linear: 匀速， ease-in: 慢-匀速， ease-in-out 慢-匀速-慢] [非必须]
              delay: item.delay * 1000, // 设置动画延迟时长 (单位毫秒) [非必须]
            }
          )
        }
      }
      resolve(true);
    })
    list.push(p)
  })
  await Promise.all(list);
}
</script>

<style lang="scss" scoped>
.person {
    border: 1px solid transparent;
    .default-body {
      position: relative;
      width: 100%;
      height: 100%;
      background-origin: content;
      /*从content区域开始显示背景*/
      background-position: 50% 50%;
      /*图片上下左右居中*/
      background-size: contain;
      /*保持图像本身的宽高比例，将图片缩放到宽度或高度正好适应定义背景的区域*/
      background-repeat: no-repeat;
      
    }
    .head {
      // width: 93px;
      // height: 80px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      // position: relative;
      // top: 7px;
    }
    .body {
      // width: 93px;
      // height: 112px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .face {
        width: 20%;
        height: 20%;
        background-origin: content;
        /*从content区域开始显示背景*/
        background-position: 50% 50%;
        /*图片上下左右居中*/
        background-size: contain;
        /*保持图像本身的宽高比例，将图片缩放到宽度或高度正好适应定义背景的区域*/
        background-repeat: no-repeat;
        position: absolute;
        left: 42%;
        top: 24%;
      }
    &.empty {
    }
}
</style>