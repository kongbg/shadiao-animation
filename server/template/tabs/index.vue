<template>
  <div class="app-container">
    <el-tabs v-model="tabIndex" class="demo-tabs">
      {{#each tabConfig }}
      <el-tab-pane label="{{this.tabName}}" :name="{{indexPlusOne @index}}">
        <List{{indexPlusOne @index}}></List{{indexPlusOne @index}}>
      </el-tab-pane>
      {{/each}}
    </el-tabs>
  </div>
</template>
<script setup>
import { useProvideSearchFormStore } from '@/hooks/useSearchFormStore'
const { tabIndex, clearStorage } = useProvideSearchFormStore()
{{#each tabConfig }}
import List{{indexPlusOne @index}} from './list/list{{indexPlusOne @index}}.vue'
{{/each}}
const activeName = ref('1')
</script>

<style lang="scss" scoped>
.app-container {
  overflow: auto;
  height: 100%;
}
</style>