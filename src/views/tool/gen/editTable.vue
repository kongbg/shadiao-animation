<template>
  <el-card>
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
          v-if="getDataApiId"
          ref="listFormRef"
          :column="info.listColumn"
          :apiId="getDataApiId"
        ></listForm>
      </el-tab-pane>
      <el-tab-pane label="查询字段信息" name="queryFormRef">
        <reqForm
          v-if="getDataApiId"
          ref="queryFormRef"
          :column="info.queryColumn"
          :apiId="getDataApiId"
        ></reqForm>
      </el-tab-pane>
      <el-tab-pane label="新增编辑字段信息" name="editFormRef">
        <editForm
          v-if="addDataApiId"
          ref="editFormRef"
          :column="info.editColumn"
          :apiId="addDataApiId"
        ></editForm>
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
import editForm from './editForm'

const basicInfoRef = ref(null)
const genInfoRef = ref(null)
const listFormRef = ref(null)
const queryFormRef = ref(null)
const editFormRef = ref(null)

const baseInfo = ref({})

const route = useRoute()
const { proxy } = getCurrentInstance()
const activeName = ref('basicInfoRef')
const tables = ref([])
const info = ref({})

const getDataApiId = ref('')
const addDataApiId = ref('')
// const editApiId = ref('167758525')
// const actionApiId = ref('167758523')
// const deleteApiId = ref('167758526')

/** 提交按钮 */
async function submitForm() {
  let basicInfo = basicInfoRef.value.getFormData()
  console.log('apiconfig:', basicInfo)
  let apiconfig = genInfoRef.value.getFormData()
  console.log('apiconfig:', apiconfig)
  let listColumn = listFormRef.value.getFormData()
  console.log('listColumn:', listColumn)
  let queryColumn = queryFormRef.value.getFormData()
  console.log('queryColumn:', queryColumn)
  let editColumn = editFormRef.value.getFormData()
  console.log('editColumn:', editColumn)

  loading.value = true
  let params = {
    id: route.params.id,
    apiconfig: JSON.stringify(apiconfig),
    listColumn: JSON.stringify(listColumn),
    queryColumn: JSON.stringify(queryColumn),
    addColumn: JSON.stringify(editColumn),
    detailColumn: JSON.stringify(editColumn),
    editColumn: JSON.stringify(editColumn),
    ...basicInfo
  }
  let res = await updateDetails(params)
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
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
          disabled: true
        },
        {
          label: '接口名称',
          value: 'addData',
          disabled: true
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
          value: '编辑',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'editData',
          disabled: true
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
          value: '查询',
          disabled: true
        },
        {
          label: '接口名称',
          value: 'getData',
          disabled: true
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
          disabled: true
        },
        {
          label: '接口名称',
          value: 'getDetails',
          disabled: true
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
          disabled: true
        },
        {
          label: '接口名称',
          value: 'deleteData',
          disabled: true
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
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    data.apiconfig = JSON.parse(data.apiconfig || JSON.stringify(domains))
    data.queryColumn = JSON.parse(data.queryColumn || JSON.stringify([]))
    data.listColumn = JSON.parse(data.listColumn || JSON.stringify([]))
    data.addColumn = JSON.parse(data.addColumn || JSON.stringify([]))
    data.editColumn = JSON.parse(data.editColumn || JSON.stringify([]))
    data.detailColumn = JSON.parse(data.detailColumn || JSON.stringify([]))
    info.value = data

    baseInfo.value = {
      name: data.name,
      desc: data.desc,
      type: 1
    }

    info.value.apiconfig.domains.forEach((item) => {
      if (item.list[1].value == 'addData') {
        addDataApiId.value = item.list[2].id
      }

      if (item.list[1].value == 'getData') {
        getDataApiId.value = item.list[2].id
      }
    })
  }
}
getItemDetail()
</script>
