<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="页面名称" prop="name">
          <el-input placeholder="请输入" v-model="info.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模板类型" prop="type">
          <el-select
            v-model="info.type"
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
      </el-col>
      <el-col :span="12">
        <el-form-item label="表描述" prop="desc">
          <el-input type="textarea" :rows="3" v-model="info.desc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: null
  }
})

const types = [
  {
    label: '搜索-列表-详情',
    value: 1
  },
  {
    label: '搜索-列表(tabs)-详情',
    value: 2
  }
]

// 表单校验
const rules = ref({
  tableName: [{ required: true, message: '请输入表名称', trigger: 'blur' }],
  tableComment: [{ required: true, message: '请输入表描述', trigger: 'blur' }],
  className: [{ required: true, message: '请输入实体类名称', trigger: 'blur' }],
  functionAuthor: [{ required: true, message: '请输入作者', trigger: 'blur' }]
})

function getFormData() {
  return props.info
}

defineExpose({
  getFormData
})
</script>
