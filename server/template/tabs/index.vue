<template>
  <div class="electronSealApp">
    <el-tabs v-model="tabIndex" class="demo-tabs">
      <el-tab-pane label="政务侧电子印章" :name="0">
        <List1></List1>
      </el-tab-pane>
      <el-tab-pane label="公众侧电子印章" :name="1">
        <List2></List2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { useProvideSearchFormStore } from '@/hooks/useSearchFormStore'
const { tabIndex, clearStorage } = useProvideSearchFormStore()
import List1 from './list/list1.vue'
import List2 from './list/list2.vue'
const activeName = ref('0')
</script>

<style scoped>
.electronSealApp {
  height: 100%;
  padding: 0 20px 20px;
}
</style>
