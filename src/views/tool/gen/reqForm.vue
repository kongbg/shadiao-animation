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
    <el-table-column label="查询" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isQuery"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="隐藏参数" min-width="5%">
      <template #default="scope">
        <el-checkbox
          true-label="1"
          false-label="0"
          v-model="scope.row.isExtraQuery"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="顺序" min-width="5%">
      <template #default="scope">
        <el-input v-model="scope.row.queryIndex"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="查询方式" min-width="12%">
      <template #default="scope">
        <el-select v-model="scope.row.queryType" placeholder="请选择">
          <el-option
            v-for="dict in queryTypes"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          >
            <span style="float: left">{{ dict.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              dict.value
            }}</span>
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="字典类型" min-width="12%">
      <template #default="scope">
        <el-select
          v-model="scope.row.dict"
          clearable
          filterable
          placeholder="请选择"
          :disabled="!['select', 'areacascader'].includes(scope.row.queryType)"
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
import { getApiDetails, getDataSchemas, getDictsFromJf } from '@/api/autoCode'
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

const queryTypes = [
  {
    label: '输入框',
    value: 'input'
  },
  {
    label: '下拉框',
    value: 'select'
  },
  {
    label: '级联区域',
    value: 'areacascader'
  },
  {
    label: '日期时间',
    value: 'datetimerange'
  }
]


// 获取建废所有字典
async function getDictsFromJfs() {
  let res = await getDictsFromJf({pageNum: 1, pageSize:9999}, { cache: true })
  if (res.code == 200) {
    dictOptions.value = res.rows || []
  }
}

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
  // 从 api-details 中找到 id= apiId 的
  // requestBody.jsonSchema.$ref 是body 传参数
  // parameters.query 是query 传参数

  let properties = {}
  if (columnsInfo.value.requestBodyId) {
    let bodyParams = dataSchema.value.find(
      (item) => item.id == columnsInfo.value.requestBodyId
    )
    // console.log('bodyParams:', bodyParams)
    properties = bodyParams.jsonSchema.properties
  } else {
    let query = columnsInfo.value.parameters?.query || []
    query.forEach((q) => {
      properties[q.name] = q
    })
  }

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
      isList: false,
      queryType: realItem?.queryType || 'input',
      isQuery: realItem?.isQuery || false,
      queryIndex: realItem?.queryIndex || '',
      isExtraQuery: realItem?.isExtraQuery || false,
      dict: realItem?.dict || ''
    }
    tableData.value.push(obj)

    tableData.value.sort((a, b) => {
      // 如果a的字段为空，则a排在b后面
      if (!a.queryIndex) return 1;
      // 如果b的字段为空，则b排在a后面
      if (!b.queryIndex) return -1;
      // 否则，按字段的大小进行排序
      return a.queryIndex - b.queryIndex;
    });
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
  return tableData.value || []
}

async function init() {
  if (!props.apiId) return
  // 获取所有接口的jsonSchema信息id
  await getApiDetail()

  // 获取所有字典
  getDictsFromJfs()

  // 获取接口字段信息
  initData()
}

setTimeout(() => {
  init()
}, 2000)

defineExpose({
  getFormData
})
</script>
