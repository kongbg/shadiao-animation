<template>
    <div class="timeline">
        <div :class="['item', drawStore.currentConfIndex == index ? 'active':'']" v-for="(item, index) in timeline" @click="init(index)">
            
            <div class="tools">
                <el-popover placement="right" :width="100" trigger="hover">
                    <template #reference>
                        <span></span>
                        <!-- <el-icon><More /></el-icon> -->
                    </template>
                    <div class="actions">
                        <div>todo</div>
                        <div class="item" style="cursor: pointer;" v-if="!!index" @click="copyPrior(index)">复制上个页面布局</div>
                    </div>
                </el-popover>
            </div>
            <img class="img" :src="item.url" alt="" srcset="">
            <!-- <Image class="img" :src="item.imageUrl"></Image> -->
        </div>
    </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance, watch, nextTick,onMounted } from 'vue';
// import Image from '@/components/Image'
import useDrawStore from '@/store/modules/draw';
import { deepClone } from '@/utils';
import Bus from '../utils/bus';
import { generateUniqueID, } from './utils'
let drawStore = useDrawStore();
const {proxy} = getCurrentInstance();

// 从每个场景中的所有组件中展出background组件，提取背景图片，组成timeline
const timeline = ref([])
function getTimeline() {
    debugger
    let confs = drawStore.drawConfigs.confs;
    confs.forEach((item, index)=>{
        let info = item.option.comps.find(v=>{
            return v.type == 'background';
        })
        if (info) {
            item.url = info.url;
        } else {
            item.url = '';
        }
    })
    timeline.value = confs;
}

function init (index=0, destroy=false) {
    let len = timeline.value.length;
    if (len && index < len) {
        // 默认选中第一个配置，第一个组件
        let data = timeline.value[index];
        drawStore.setDataByName('currentConfIndex', index)
        Bus.$emit('timelineChange', {data, destroy});
    }

    if (!len) {
        drawStore.setDataByName('currentConfIndex', '')
        Bus.$emit('timelineChange', {data: {id:''}, destroy: true});
    }
}


const copyPrior = (index) => {
    let oldData = getConfigByIndex(index);
    let newData = getConfigByIndex(index-1);
}
function getConfigByIndex (index) {
    return deepClone(timeline.value[index]);
}
onMounted(()=>{
    Bus.$on('videoClick', ()=>{
        getTimeline();
        init(0,true);
    })
})
</script>
<style lang="scss" scoped>
.timeline {
    width: calc(100% - 4px);
    white-space: nowrap;
    overflow: auto;

    .item {
        display: inline-block;
        background-color: #ccc;
        width: 150px;
        height: 100px;
        margin-right: 15px;
        overflow: hidden;
        position: relative;
        &.active {
            border: 1px solid #409eff;
        }
        .tools {
            position: absolute;
            top: 0px;
            right: 5px;
            cursor: pointer;
        }
        .img {
            width: 152px;
            cursor: pointer;
        }
    }
}
</style>