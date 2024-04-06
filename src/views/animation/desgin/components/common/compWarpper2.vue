<template>
    <VueDragResize
        :isActive="active"
        :isResizable="props.compData.type !== 'background'"
        :isDraggable="props.compData.type !== 'background'"
        :w="200"
        :h="200"
        :id="`comp-${props.compData.id}`"
        :ref="`warp-${props.compData.id}`"
        :class="['comp__warpper', drawStore.tempTargetId == props.compData.id ? 'temp-select' : '']"
        :style="customStyle"
        @clicked.stop="clicked"
        @resizing="resizeFn"
        @dragging="resizeFn"
        @dragstop="dragstop">
            <slot></slot>
            <el-icon class="delete" @click="deleteComp">
                <DeleteFilled />
            </el-icon>
    </VueDragResize>
</template>
<script setup>
import { computed, provide, onMounted, ref, watch, getCurrentInstance } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import useDrawStore from '@/store/modules/draw';
import VueDragResize from 'vue-drag-resize/src';
import { throttle } from '@/utils'
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
let Left = ref(0);
let Top = ref(0);
let actionInfo = null;
let property = props.compData.schema.property;
if (property.position) {
    let position = property.position;
    Left.value = position.value.x.value;
    Top.value = position.value.y.value;
}



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
const isActive = computed(() => {
    
    let { type, id } = drawStore.currentCompInfo;
    return type != 'background' && id == props.compData.id;
})

		
function findObjectById(data, targetId) {
    for (let obj of data) {
        if (obj.id === targetId) {
            return obj;
        }
        if (obj.actions) {
            let result = findObjectById(obj.actions, targetId);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
const resize = (newRect) => {
    let property = props.compData.schema.property;
    let data = property.position.value;
    let { width, height, top, left} = newRect;

    if (property.position) {
        data.x.value = Left.value + left;
        data.y.value = Top.value + top;

        if (drawStore.editActionId) {
            // console.log('drawStore.ox:', drawStore.ox)
            data.ox.value = drawStore.ox;
            data.oy.value = drawStore.oy;
        } else {
            data.ox.value = Left.value + left;
            data.oy.value = Top.value + top;
            drawStore.setDataByName('ox', Left.value + left);
            drawStore.setDataByName('oy', Top.value + top);
        }
        
    }

    // 正在设置动画编辑元素位置
    if (drawStore.editActionId) {
        let currentConfInfo = drawStore.drawConfigs.confs[drawStore.currentConfIndex];
        let actions = currentConfInfo.actions;
        // console.log('actions:', actions)
        actionInfo = findObjectById(actions, drawStore.editActionId);
        // console.log('actionInfo:', actionInfo, drawStore.editActionId)
        // 移动元素
        if (actionInfo && actionInfo.type.includes('move') && actionInfo.type.includes('translate')) {
            actionInfo.x = data.x.value;
            actionInfo.y = data.y.value;
        }
    }
    
}
const resizeFn = throttle(resize, 100);
const clicked = (newRect) => {
    // console.log('clicked:',newRect)
}
const dragstop = (newRect) => {
    // let property = props.compData.schema.property;
    // if(actionInfo) {
    //     if (property.position) {
    //         let data = property.position.value;
    //         data.x.value = left;
    //         data.y.value = top;
    //     }
    // }
}
//  根据子元素的xy定位
const customStyle = computed(() => {
    let property = props.compData.schema.property;
    if (property.position) {
        let data = property.position.value;
        let nuit = data.unit.value;
        let x = data.x.value, y = data.y.value,z = data.zIndex.value;
        return {
            left: `${x}${nuit}`,
            top: `${y}${nuit}`,
            zIndex: `${z}`
        }
    }
    return {};
})
const deleteComp = () => {
    drawStore.drawConfigs.confs[drawStore.currentConfIndex].comps.splice(drawStore.currentCompIndex, 1);
    drawStore.setDataByName('currentCompIndex', 0)
    
    drawStore.outEditAction()
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

    &.temp-select {
        border: 1px dashed #409eff;
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