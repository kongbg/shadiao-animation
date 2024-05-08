<template>
    <el-card v-if="info">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="basicInfoRef">
          <basic-info-form ref="basicInfoRef" :info="info.baseInfo" />
        </el-tab-pane>
        <el-tab-pane label="接口信息" name="genInfoRef">
          <gen-info-form
            ref="genInfoRef"
            :info="info.apiconfig"
            :tables="tables"
          />
        </el-tab-pane>
        <el-tab-pane label="列表字段信息" name="listFormRef">
          <listForm
            ref="listFormRef"
            :column="info.listColumn"
            :apiId="info.getDataApiId"
          ></listForm>
        </el-tab-pane>
        <el-tab-pane label="列表页按钮接口信息" name="listActionFormRef">
          <listActionForm
            ref="listActionFormRef"
            :actions="info.listActions"
            :apiId="info.getDataApiId"
          ></listActionForm>
        </el-tab-pane>
        <el-tab-pane label="查询字段信息" name="queryFormRef">
          <reqForm
            ref="queryFormRef"
            :column="info.queryColumn"
            :apiId="info.getDataApiId"
          ></reqForm>
        </el-tab-pane>
        <el-tab-pane label="新增编辑字段信息" name="editFormRef">
          <editForm
            ref="editFormRef"
            :column="info.editColumn"
            :apiId="info.createDataApiId"
          ></editForm>
        </el-tab-pane>
        <el-tab-pane label="新增编辑页按钮接口信息" name="editActionFormRef">
          <editActionForm
            ref="editActionFormRef"
            :actions="info.editActions"
            :apiId="info.getDataApiId"
          ></editActionForm>
        </el-tab-pane>
      </el-tabs>
      <el-form label-width="100px">
        <div style="text-align: center; margin-left: -100px; margin-top: 10px">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="close()">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </template>
  
  <script setup name="GenEdit">
  import { getItemDetails, updateDetails } from '@/api/autoCode'
  import basicInfoForm from './components/basicInfoForm'
  import genInfoForm from './components/genInfoForm'
  import reqForm from './components/reqForm'
  import listForm from './components/listForm'
  import listActionForm from './components/listActionForm'
  import editActionForm from './components/editActionForm'
  import editForm from './components/editForm'

  const props = defineProps({
    configs: {
      type: Array,
      default: ()=>[]
    },
    id: {
      type: String,
      default: ''
    }
  })

  const info = ref(null)
  
  const basicInfoRef = ref(null)
  const genInfoRef = ref(null)
  const listFormRef = ref(null)
  const queryFormRef = ref(null)
  const editFormRef = ref(null)
  const listActionFormRef = ref(null)
  const editActionFormRef = ref(null)
  
  const route = useRoute()
  const { proxy } = getCurrentInstance()
  const activeName = ref('basicInfoRef')
  const tables = ref([])
  
  const loading = ref(false)

  /** 提交按钮 */
  async function submitForm() {
    let basicInfo = basicInfoRef.value.getFormData()
    let apiconfig = genInfoRef.value.getFormData()
    let listColumn = listFormRef.value.getFormData()
    let listActions = listActionFormRef.value.getFormData()
    let queryColumn = queryFormRef.value.getFormData()
    let editColumn = editFormRef.value.getFormData()
    let editActions = editActionFormRef.value.getFormData()
  
    loading.value = true
    let params = {
      id: props.id,
      apiconfig: JSON.stringify(apiconfig),
      listColumn: JSON.stringify(listColumn),
      listActions: JSON.stringify(listActions),
      queryColumn: JSON.stringify(queryColumn),
      addColumn: JSON.stringify(editColumn),
      detailColumn: JSON.stringify(editColumn),
      editColumn: JSON.stringify(editColumn),
      editActions: JSON.stringify(editActions),
      ...basicInfo
    }
    let res = await updateDetails(params)
    loading.value = false
    let { code, data, msg } = res
    if (code == 200) {
      proxy.$modal.msgSuccess("编辑成功");
    }
  }
  
  function close() {
    const obj = {
      path: '/tool/gen',
      query: { t: Date.now(), pageNum: route.query.pageNum }
    }
    proxy.$tab.closeOpenPage(obj)
  }

  



  function init() {
    if(props.configs.length) {
      info.value = props.configs[0]
      console.log('info.value:', info.value)
    }
  }
  init()
  </script>
  