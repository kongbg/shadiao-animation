<template>
  <!-- 创建表 -->
  <el-dialog
    title="创建模块"
    v-model="visible"
    width="600px"
    top="5vh"
    
    append-to-body
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="模板类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="选择模板类型"
          style="width: 240px"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入文本"
          v-model="form.desc"
        ></el-input>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImportTable">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const visible = ref(false)
const formRef = ref(null)
const form = ref({
  type: '1'
})
const rules = ref({
  name: [
    { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
  ],
  type: [
    { required: true, message: '选择模板类型', trigger: ['blur', 'change'] }
  ],
  desc: [
    { required: true, message: '请输入描述', trigger: ['blur', 'change'] }
  ]
})
const emit = defineEmits(['ok'])

const types = [
  {
    label: '搜索-列表-详情',
    value: '1'
  },
  {
    label: '搜索-列表(tabs)-详情',
    value: '2'
  }
]

/** 显示弹框 */
function show() {
  visible.value = true
  form.value = { type: '1'}
}

/** 导入按钮操作 */
async function handleImportTable() {
  formRef.value.validate(valid=>{
    if(valid) {
      visible.value = false
      emit('ok', form.value)
    }
  })
}

defineExpose({
  show
})
</script>
