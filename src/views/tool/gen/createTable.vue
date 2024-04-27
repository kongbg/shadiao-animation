<template>
  <!-- 创建表 -->
  <el-dialog
    title="创建表"
    v-model="visible"
    width="800px"
    top="5vh"
    append-to-body
  >
    <span>名称</span>
    <el-input placeholder="请输入文本" v-model="name"></el-input>
    <span>描述</span>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入文本"
      v-model="desc"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImportTable">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { createTable } from '@/api/tool/gen'

const visible = ref(false)
const name = ref('')
const desc = ref('')
const { proxy } = getCurrentInstance()
const emit = defineEmits(['ok'])

/** 显示弹框 */
function show() {
  visible.value = true
}

/** 导入按钮操作 */
function handleImportTable() {
  if (name.value === '') {
    proxy.$modal.msgError('请输入名称')
    return
  }
  visible.value = false
  emit('ok', { name: name.value, desc: desc.value })
}

defineExpose({
  show
})
</script>
