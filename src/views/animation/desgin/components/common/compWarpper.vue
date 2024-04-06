<template>
    <div class="comp__warpper"
        :id="`comp-${props.compData.id}`"
        :ref="`warp-${props.compData.id}`"
        :class="[props.active ? 'active' : '']"
        :style="customStyle"
        v-drag
    >
        <slot></slot>
        <span class="draw-icon top-center"></span>
        <span class="draw-icon top"></span>
        <span class="draw-icon left"></span>
        <span class="draw-icon right"></span>
        <span class="draw-icon bottom"></span>
        <span class="draw-icon top-left"></span>
        <span class="draw-icon top-right"></span>
        <span class="draw-icon bottom-left"></span>
        <span class="draw-icon bottom-right"></span>
        <el-icon class="delete" @click="deleteComp">
            <!-- <Delete /> -->
        </el-icon>
    </div>
</template>
<script setup>
import { computed, provide, onMounted, ref, watch, getCurrentInstance } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import useDrawStore from '@/store/modules/draw';
let drawStore = useDrawStore();
const { proxy }  = getCurrentInstance();
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  compData: {
    type: Object,
    default: () => ({})
  }
});
// 拖拽改变大小
const vDragSize = {
    mounted: (el) => {
        
    }
}
let isDown = false;
// fix: 解决点击元素后不移动，监听鼠标放开失败问题
watch(()=> props.active, value => {
    isDown= false;
})
// 推拽改变位置
const vDrag = {
    mounted: (el) => {
        let classList = [...el.childNodes[1].classList];
        if (classList.includes('backgroundImg')) return;
        let x = 0;
        let y = 0;
        let l = 0;
        let t = 0;
        let nl = 0;
        let nt = 0;
        let dom = document.getElementById(`comp-${props.compData.id}`);
        let elwidth = dom && dom.offsetWidth || 0;
        let elheight = dom && dom.offsetHeight || 0;
        // let isDown = false;
        //鼠标按下事件
        el.onmousedown = function(e) {
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = el.offsetLeft;
            t = el.offsetTop;
            //开关打开
            isDown = true;
            //设置样式
            el.style.cursor = "move";

            //鼠标移动
            let dhdrawcontent = document.getElementById('dh-draw-content');
            dhdrawcontent.onmousemove = function(e) {
                if (isDown == false) {
                    return;
                }
                //获取x和y
                let nx = e.clientX;
                let ny = e.clientY;
                //计算移动后的左偏移量和顶部的偏移量 限制左上
                nl = nx - (x - l) <= 0 ? 0 : nx - (x - l);
                nt = ny - (y - t) <= 0 ? 0 : ny - (y - t);

                //限制右下
                nl = nl >= dhdrawcontent.offsetWidth - elwidth ? dhdrawcontent.offsetWidth - elwidth : nl;
                nt = nt >= dhdrawcontent.offsetHeight - elheight  ? dhdrawcontent.offsetHeight - elheight : nt;

                el.style.left = nl + "px";
                el.style.top = nt + "px";


                //鼠标抬起事件
                el.onmouseup = function() {
                    // console.log('鼠标抬起事件')
                    //开关关闭
                    isDown = false;
                    props.compData.schema.property.position.value.x.value = nl;
                    props.compData.schema.property.position.value.y.value = nt;
                    
                    el.style.cursor = "default";
                }
            };
        };
        
        
    }
}


//  根据子元素的xy定位
const customStyle = computed(() => {
    let property = props.compData.schema.property;
    if (property.position) {
        let data = property.position.value;
        let nuit = data.unit.value;
        return {
            left: `${data.x.value}${nuit}`,
            top: `${data.y.value}${nuit}`,
            zIndex: `${data.zIndex.value}`
        }
    }
    return {};
})

const setAnimate = async (propertys, options) => {
    return new Promise((resolve, reject) => {
        // console.log( propertys, options, `comp-${props.compData.id}`)
        let playload = {
            targets: `#comp-${props.compData.id}`,
            ...propertys,
            ...options,
            complete: function(anim) {
                resolve(true)
            },
        }
        anime(playload)
    })
}
provide('setAnimate', setAnimate)

const deleteComp = () => {
    drawStore.drawConfigs.confs[drawStore.currentConfIndex].comps.splice(drawStore.currentCompIndex, 1);
    drawStore.setCurrentCompIndex(0)
    drawStore.setCurrentCompInfo(drawStore.drawConfigs.confs[drawStore.currentConfIndex].comps[0]);
}

const mousedown = (e) => {
    console.log('mousedown:', e)
}

const mousemove = (e) => {
    e.stopPropagation()
    console.log('mousemove:', e)
}
const mouseup = (e) => {
    console.log('mouseup:', e)
}

</script>
<style lang="scss" scoped>
.comp__warpper {
    position: absolute;
    border: 1px solid transparent;
    cursor: pointer;
    .draw-icon{
        display: none;
    }
    .delete {
        position: absolute;
        top: 2px;
        right: 2px;
        color: #409eff;
        cursor: pointer;
        display: none;
    }
    &.active {
        border: 1px dashed #409eff;
        .draw-icon {
            position: absolute;
            display: block;
            &.top-center {
                top: -22px;
                left: 50%;
                transform: translateX(-50%);
                background: url('./../../../../assets/icons/move.png') no-repeat;
                width: 20px;
                height: 20px;
                background-size: 100% 100%;
                cursor: pointer;
            }
            &.top {
                top: -2px;
                left: 50%;
                transform: translateX(-50%);
                width: 25px;
                height: 3px;
                background: #409eff;
                cursor: row-resize;
            }
            &.left {
                left: -2px;
                top: 50%;
                transform: translateY(-50%);
                height: 25px;
                width: 3px;
                background: #409eff;
                cursor: col-resize;
            }
            &.right {
                right: -2px;
                top: 50%;
                transform: translateY(-50%);
                height: 25px;
                width: 3px;
                background: #409eff;
                cursor: col-resize;
            }
            &.bottom {
                bottom: -2px;
                left: 50%;
                transform: translateX(-50%);
                width: 25px;
                height: 3px;
                background: #409eff;
                cursor: row-resize;
            }
            &.top-left {
                width: 20px;
                top: -2px;
                left: -2px;
                cursor: nwse-resize;
                &::after,&::before{
                    display: block;
                    content: '';
                    width: 3px;
                    height: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: #409eff;
                }
                &::before{
                    width: 20px;
                    height: 3px;
                }
            }
            &.top-right {
                width: 20px;
                top: -2px;
                right: -2px;
                cursor: nesw-resize;
                &::after,&::before{
                    display: block;
                    content: '';
                    width: 3px;
                    height: 20px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #409eff;
                }
                &::before{
                    width: 20px;
                    height: 3px;
                }
            }
            &.bottom-left {
                width: 20px;
                bottom: -2px;
                left: -2px;
                cursor: nesw-resize;
                &::after,&::before{
                    display: block;
                    content: '';
                    width: 3px;
                    height: 20px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: #409eff;
                }
                &::before{
                    width: 20px;
                    height: 3px;
                }
            }
            &.bottom-right {
                width: 20px;
                bottom: -2px;
                right: -2px;
                cursor: nwse-resize;
                &::after,&::before{
                    display: block;
                    content: '';
                    width: 3px;
                    height: 20px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: #409eff;
                }
                &::before{
                    width: 20px;
                    height: 3px;
                }
            }
        }
        .delete {
            display: block;
        }
    }
}
</style>