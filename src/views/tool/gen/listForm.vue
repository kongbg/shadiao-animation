<template>
  <el-table
    ref="dragTable"
    :data="tableData"
    row-key="columnId"
    :max-height="tableHeight"
  >
    <el-table-column label="序号" type="index" min-width="5%" />
    <el-table-column
      label="字段列名"
      prop="columnName"
      min-width="10%"
      :show-overflow-tooltip="true"
    />
    <el-table-column label="字段描述" min-width="10%">
      <template #default="scope">
        <el-input v-model="scope.row.columnComment" disabled></el-input>
      </template>
    </el-table-column>
    <el-table-column label="表头描述" min-width="10%">
      <template #default="scope">
        <el-input v-model="scope.row.label"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="数据类型"
      min-width="11%"
      :show-overflow-tooltip="true"
    >
      <template #default="scope">
        {{ scope.row.javaType }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="插入" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isInsert"
        ></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- <el-table-column label="编辑" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isEdit"
        ></el-checkbox>
      </template>
    </el-table-column> -->
    <el-table-column label="列表" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isList"
        ></el-checkbox>
      </template>
    </el-table-column>
    <!-- <el-table-column label="查询" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isQuery"
        ></el-checkbox>
      </template>
    </el-table-column> -->
    <el-table-column label="字典类型" min-width="12%">
      <template #default="scope">
        <el-select
          v-model="scope.row.dictType"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="dict in dictOptions"
            :key="dict.dictType"
            :label="dict.dictName"
            :value="dict.dictType"
          >
            <span style="float: left">{{ dict.dictName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              dict.dictType
            }}</span>
          </el-option>
        </el-select>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup name="ReqForm">
import { getApiDetails, getDataSchemas } from '@/api/autoCode'
const { proxy } = getCurrentInstance()
const props = defineProps({
  apiId: {
    type: String,
    default: ''
  },
  column: {
    type: Array,
    default: () => []
  }
})
const tableHeight = ref(document.documentElement.scrollHeight - 245 + 'px')
const tableData = ref([])
const columnsInfo = ref({})
const apiDetails = ref([])
const dataSchema = ref([])
const dictOptions = ref([])
const columnMap = {}

// 获取所有接口的jsonSchema信息id
async function getApiDetail() {
  let id = props.apiId
  let res = await getApiDetails({}, { cache: true })
  if (res.success) {
    apiDetails.value = res.data

    columnsInfo.value = res.data.find((item) => {
      return item.id == id
    })
    // body参数id
    columnsInfo.value.requestBodyId = getId(
      columnsInfo.value.requestBody?.jsonSchema?.$ref
    )
    //query参数id
    columnsInfo.value.requestQueryId = getId('')
    // 响应参数
    columnsInfo.value.resId = getId(
      columnsInfo.value.responses[0]?.jsonSchema?.$ref
    )
  }
}

// 获取所有接口的jsonSchema信息
async function getDataSchema() {
  let res = await getDataSchemas({}, { cache: true })
  if (res.success) {
    dataSchema.value = res.data || []
  }
}
// 获取接口字段信息
async function initData() {
  // 获取所有接口的jsonSchema信息
  await getDataSchema()

  // 获取请求字段信息
  let properties = getColumns()

  // 获取表格数据
  initTableData(properties)
}

// 获取请求字段信息
function getColumns() {
  // 从 api-tree-list 接口中 得到 apiId  (api.id)
  // 从 api-details 中找到 id= apiId 的 得到 resId
  // 从 data-schemas 中找

  let properties = {}

  let id = columnsInfo.value.resId
  let info = dataSchema.value.find((item) => item.id == id)
  // console.log('req', id, info)
  let id2 = getId(info.jsonSchema.properties.data.$ref)
  let info2 = dataSchema.value.find((item) => item.id == id2)
  // console.log('req2', id2, info2)
  let id3 = getId(info2.jsonSchema.properties.list.items.$ref)
  let res = dataSchema.value.find((item) => item.id == id3)
  // console.log('res', id3, res)

  properties = res.jsonSchema.properties

  return properties
}

// 获取表格数据
function initTableData(properties = {}) {
  initColumnMap()
  for (const key in properties) {
    let item = properties[key]
    let realItem = columnMap[key]
    let obj = {
      columnName: key,
      columnComment: item.description,
      label: realItem?.label || item.description,
      javaType: item.type,
      isInsert: false,
      isEdit: false,
      isList: realItem?.isList || false,
      isQuery: false,
      dictType: realItem?.dict || ''
    }
    tableData.value.push(obj)
  }
}

function initColumnMap() {
  props.column.forEach((item) => {
    columnMap[item.columnName] = item
  })
}

function getId(str = '') {
  let arr = str.split('/')
  if (arr.length) {
    return arr[arr.length - 1]
  } else {
    return ''
  }
}

/** 提交按钮 */
function getFormData() {
  // let listParams = []
  // tableData.value.forEach((item) => {
  //   let { columnName, columnComment, dictType, isList } = item
  //   let obj = {
  //     columnName,
  //     columnComment,
  //     dictType
  //   }
  //   if (isList) listParams.push(obj)
  // })

  return tableData.value || []
}

async function init() {
  debugger
  if (!props.apiId) return
  // 获取所有接口的jsonSchema信息id
  await getApiDetail()

  // 获取接口字段信息
  initData()
}

init()

defineExpose({
  getFormData
})
</script>
