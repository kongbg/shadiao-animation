<template>
  <el-card v-if="!loading">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basicInfoRef">
        <basic-info-form ref="basicInfoRef" :info="baseInfo" />
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
          :apiId="getDataApiId"
        ></listForm>
      </el-tab-pane>
      <el-tab-pane label="列表页按钮接口信息" name="listActionFormRef">
        <listActionForm
          ref="listActionFormRef"
          :actions="info.listActions"
          :apiId="getDataApiId"
        ></listActionForm>
      </el-tab-pane>
      <el-tab-pane label="查询字段信息" name="queryFormRef">
        <reqForm
          ref="queryFormRef"
          :column="info.queryColumn"
          :apiId="getDataApiId"
        ></reqForm>
      </el-tab-pane>
      <el-tab-pane label="新增编辑字段信息" name="editFormRef">
        <editForm
          ref="editFormRef"
          :column="info.editColumn"
          :apiId="createDataApiId"
        ></editForm>
      </el-tab-pane>
      <el-tab-pane label="新增编辑页按钮接口信息" name="editActionFormRef">
        <editActionForm
          ref="editActionFormRef"
          :actions="info.editActions"
          :apiId="getDataApiId"
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
import basicInfoForm from './basicInfoForm'
import genInfoForm from './genInfoForm'
import reqForm from './reqForm'
import listForm from './listForm'
import listActionForm from './listActionForm'
import editActionForm from './editActionForm'
import editForm from './editForm'

const basicInfoRef = ref(null)
const genInfoRef = ref(null)
const listFormRef = ref(null)
const queryFormRef = ref(null)
const editFormRef = ref(null)
const listActionFormRef = ref(null)
const editActionFormRef = ref(null)

const baseInfo = ref({})

const route = useRoute()
const { proxy } = getCurrentInstance()
const activeName = ref('basicInfoRef')
const tables = ref([])
const info = ref({})

const getDataApiId = ref('')
const createDataApiId = ref('')
// const editApiId = ref('167758525')
// const actionApiId = ref('167758523')
// const deleteApiId = ref('167758526')

/** 提交按钮 */
async function submitForm() {
  let basicInfo = basicInfoRef.value.getFormData()
  // console.log('apiconfig:', basicInfo)
  let apiconfig = genInfoRef.value.getFormData()
  // console.log('apiconfig:', apiconfig)
  let listColumn = listFormRef.value.getFormData()
  // console.log('listColumn:', listColumn)
  let listActions = listActionFormRef.value.getFormData()
  // console.log('listActions:', listActions)
  let queryColumn = queryFormRef.value.getFormData()
  // console.log('queryColumn:', queryColumn)
  let editColumn = editFormRef.value.getFormData()
  // console.log('editColumn:', editColumn)
  let editActions = editActionFormRef.value.getFormData()
  // console.log('editActions:', editActions)

  loading.value = true
  let params = {
    id: route.params.id,
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

let domains = {
  domains: [
    {
      list: [
        {
          label: '功能名称',
          value: '新增',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'createData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '详情',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'getDetails',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '更新',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'updateData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '列表',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'getData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '删除',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'deleteData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '导出',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'exportData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    }
  ]
}

const loading = ref(false)
async function getItemDetail() {
  loading.value = true
  let params = {
    id: route.params.id
  }
  let res = await getItemDetails(params)
  // loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    data.apiconfig = JSON.parse(data.apiconfig || JSON.stringify(domains))
    data.queryColumn = JSON.parse(data.queryColumn || JSON.stringify([]))
    data.listColumn = JSON.parse(data.listColumn || JSON.stringify([]))
    data.listActions = JSON.parse(data.listActions || JSON.stringify([]))
    data.addColumn = JSON.parse(data.addColumn || JSON.stringify([]))
    data.editColumn = JSON.parse(data.editColumn || JSON.stringify([]))
    data.detailColumn = JSON.parse(data.detailColumn || JSON.stringify([]))
    data.editActions = JSON.parse(data.editActions || JSON.stringify([]))
    info.value = data

    baseInfo.value = {
      name: data.name,
      desc: data.desc,
      type: data.type || '1',
      moduleName: data.moduleName || '',
      path: data.path || '',
      apiFolder: data.apiFolder || '',
      pageFolder: data.pageFolder || '',
      codePath: data.codePath || ''
    }
    info.value.apiconfig.domains.forEach((item) => {
      if (item.list[1].value == 'createData') {
        createDataApiId.value = item.list[2].id
      }

      if (item.list[1].value == 'getData') {
        getDataApiId.value = 111//item.list[2].id
      }
    })
  }
  loading.value = false
}
getItemDetail()
</script>
