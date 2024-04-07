<template>
    <div class="app-container">
        <el-tabs v-model="tabInfo.activeName" class="tabs" @tab-change="tabChange">
            <el-tab-pane v-for="item in tabInfo.list" :label="item.label" :key="item.name" :name="item.name">
                <List :columns="item.columns" :searchConfig="item.searchConfig" :activeName="item.name"></List>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  
<script setup>
import { ref, onMounted, reactive, } from "vue";
import List from './list'
import configs, { allTabList } from "./config.js";
const router = useRouter();

console.log('configs:', configs)
let userType = '';
let config = configs[(userType||'default')]
let tabInfo = reactive({
    list: [],
    activeName: ''
})
const initTabs = () => {
    tabInfo.list = allTabList.filter(item=>{
        item.columns = config.columns[item.name];
        item.searchConfig = config.searchConfig[item.name];

        return config.tabList.includes(item.name);
    });
    tabInfo.activeName = (tabInfo.list.length && tabInfo.list[0].name) || "";
};

onMounted(() => {
    initTabs();
});


</script>
<style lang="scss" scoped>
.app-container {
    padding-top: 0;
}
.tabs {
    background: #fff;
    height: 100%;

    :deep(.el-tabs__content) {
        height: calc(100% - 53px);

        .el-tab-pane {
            height: 100%;
        }
    }
}
</style>
  