<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col v-if="type == 2" :span="12">
        <el-form-item  label="标签名称" prop="tabName">
          <el-input placeholder="请输入" v-model="info.tabName" />
        </el-form-item>
      </el-col>
      <el-col v-if="type == 2" :span="12">
        <el-form-item  label="标签ID" prop="tabId">
          <el-input placeholder="请输入" v-model="info.tabId" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="功能名称" prop="name">
          <el-input placeholder="请输入" v-model="info.name" />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
        <el-form-item label="模板类型" prop="type">
          <el-select
            v-model="info.type"
            disabled
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
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="统一标识" prop="codePath">
          <el-input placeholder="用于设置api目录跟views目录下的第一级目录，如：customized" v-model="info.codePath" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模块名称" prop="moduleName">
          <el-input placeholder="用于设置统一标识目录下的第二级目录，如：test" v-model="info.moduleName" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" :rows="3" v-model="info.desc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>导出代码到其他项目配置</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="代码存放基础路径" prop="path">
          <el-input placeholder="如：D:\jf2\remotemain\jzlj-01-qd-supervise 或/或''" v-model="info.path" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="api存放路径" prop="apiFolder">
          <el-input placeholder="如：src/api/customized" v-model="info.apiFolder" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="页面存放路径" prop="pageFolder">
          <el-input placeholder="如：src/views/customized" v-model="info.pageFolder" />
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

console.log(props.info)


const route = useRoute()
const type = route.query.type

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

// 表单校验
const rules = ref({
  name: [{ required: true, message: '请输入功能名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择模板类型', trigger: 'blur' }],
  moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  path: [{ required: false, message: '请输入模块存放路径', trigger: 'blur' }],
})

function getFormData() {
  return props.info
}

defineExpose({
  getFormData
})
</script>
