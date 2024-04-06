<template>
    <div class="comp-position">
        <el-collapse class="collapse" v-model="activeNames">
            <el-collapse-item class="item__warpper" :title="item.name" :name="index"
                v-for="(item, index) in children" :key="index" v-show="item.show || item.show == undefined">
                <component v-if="item.show || item.show == undefined" :is="compMap[item.type]" :compData="item.value" :children="item.children">
                </component>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import position from './position.vue';
import size from './size.vue';
import face from './face.vue';
import speak from './actions/speak.vue';
import head from './head.vue';
import body from './body.vue';
import child from './child.vue';
import moveTranslate from './actions/move-translate.vue'

const props = defineProps({
    compData: {
        type: Object,
        default: () => ({})
    },
    children: {
        type: Object,
        default: () => ({})
    }
});
let compMap = {
    position,
    size,
    face,
    head,
    body,
    speak,
    child,
    "move-translate": moveTranslate
}

const activeNames = ref([]);

initActiveNames();
function initActiveNames() {
    for (const key in props.children) {
        activeNames.value.push(props.children[key].type)
    }
}



</script>
<style lang="scss" scoped>
.comp-position {
    padding-left: 20px;
    .p-item {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        padding-left: 10px;
        .unit {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 6px;
        }

        .label {
            min-width: 32px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>