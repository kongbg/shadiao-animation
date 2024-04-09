<template>
    <div class="donghua__warpper">
        <sideBar class="sideBar" @create="data => Bus.$emit('createCopm', data)"></sideBar>
        <content></content>
        <panelPeer class="pannelPeer" @change="panelPeerChange"></panelPeer>
    </div>
</template>
<script setup>
import sideBar from './components/sideBar.vue'
import panelPeer from './components/panelPeer.vue'
import content from './components/content.vue'
import Bus from "./utils/bus";



function panelPeerChange({action, data}) {
    switch(action){
        case 'hoverComp':
            Bus.$emit('hoverComp', data.compId)
        break
        case 'propertyChange':
            console.log('属性有变动', data);
            Bus.$emit('updataComp', data)
        break
    }
}

</script>

<style lang="scss" scoped>
.donghua__warpper {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;

    .sideBar {
        width: 300px;
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