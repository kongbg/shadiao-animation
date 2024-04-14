<template>
    <div class="numes-list">
        <Source-collapse :imageType="imageType"></Source-collapse>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import SourceCollapse from './sideBar/SourceCollapse'

const imageType = ref([
    'head',
    'hair',
    'body',
    'hand',
    'foot',
    'face',
    'weapon',
    'effect'
])
</script>

<style lang="scss" scoped>
.numes-list {
    height: calc(100% - 84px);
    overflow: auto;
}
</style>
