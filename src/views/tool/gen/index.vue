<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="表名称" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入表名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="表描述" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          placeholder="请输入表描述"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Download"
          :disabled="multiple"
          @click="handleGenTable"
          v-hasPermi="['tool:gen:code']"
          >生成</el-button
        >
      </el-col>
      
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="openCreateTable"
          v-hasRole="['admin']"
          >创建</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="Upload"
          @click="openImportTable"
          v-hasPermi="['tool:gen:import']"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleEditTable"
          v-hasPermi="['tool:gen:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tool:gen:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      ></el-table-column>
      <el-table-column label="序号" type="index" width="50" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="表名称"
        align="center"
        prop="name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="表描述"
        align="center"
        prop="desc"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column
        label="实体"
        align="center"
        prop="className"
        :show-overflow-tooltip="true"
      /> -->
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="160"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="160"
      />
      <el-table-column
        label="操作"
        align="center"
        width="330"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-tooltip content="预览" placement="top">
            <el-button
              link
              type="primary"
              icon="View"
              @click="handlePreview(scope.row)"
              v-hasPermi="['tool:gen:preview']"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button
              link
              type="primary"
              icon="Edit"
              @click="handleEditTable(scope.row)"
              v-hasPermi="['tool:gen:edit']"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              link
              type="primary"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['tool:gen:remove']"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="同步" placement="top">
            <el-button
              link
              type="primary"
              icon="Refresh"
              @click="handleSynchDb(scope.row)"
              v-hasPermi="['tool:gen:edit']"
            ></el-button>
          </el-tooltip>
          <!-- <el-tooltip content="生成代码" placement="top">
            <el-button
              link
              type="primary"
              icon="Download"
              @click="handleGenTable(scope.row)"
              v-hasPermi="['tool:gen:code']"
            ></el-button>
          </el-tooltip> -->
          <el-tooltip content="生成代码" placement="top">
            <el-button
              link
              type="primary"
              icon="Download"
              @click="handleGenTableCreate(scope.row)"
              v-hasPermi="['tool:gen:code']"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 预览界面 -->
    <preview-code ref="previewCodeRef" :code="preview.data" :type="preview.type"></preview-code>
    <import-table ref="importRef" @ok="handleQuery" />
    <create-table ref="createRef" @ok="handleCreate" />
  </div>
</template>

<script setup name="Gen">
import {
  listTable,
  previewTable,
  delTable,
  genCode,
  synchDb
} from '@/api/tool/gen'
import { getConfigs, addConfig, previewTable2 } from '@/api/autoCode'
import { getModules, addcodeModule, deleteModule } from '@/api/codeModule'
import router from '@/router'
import importTable from './importTable'
import createTable from './createTable'
import previewCode from './previewCode'

const route = useRoute()
const { proxy } = getCurrentInstance()

const tableList = ref([])
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const tableNames = ref([])
const dateRange = ref([])
const uniqueId = ref('')

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tableName: undefined,
    tableComment: undefined
  },
  preview: {
    open: false,
    title: '代码预览',
    data: {},
    activeName: 'api',
    type: ''
  }
})

const { queryParams, preview } = toRefs(data)

onActivated(() => {
  const time = route.query.t
  if (time != null && time != uniqueId.value) {
    uniqueId.value = time
    queryParams.value.pageNum = Number(route.query.pageNum)
    dateRange.value = []
    proxy.resetForm('queryForm')
    getList()
  }
})

/** 查询表集合 */
async function getList() {
  loading.value = true
  let params = {
    page: queryParams.pageNum,
    pageSize: queryParams.pageSize
  }
  let res = await getModules(params)
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    tableList.value = data.data
    total.value = data.total
  }
}

// 新增
async function handleCreate(option) {
  loading.value = true
  let params = {
    ...option
  }
  let res = await addcodeModule(params)
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    getList()
  }
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 生成代码操作 */
function handleGenTable(row) {
  const tbNames = row.tableName || tableNames.value
  if (tbNames == '') {
    proxy.$modal.msgError('请选择要生成的数据')
    return
  }
  if (row.genType === '1') {
    genCode(row.tableName).then((response) => {
      proxy.$modal.msgSuccess('成功生成到自定义路径：' + row.genPath)
    })
  } else {
    proxy.$download.zip('/tool/gen/batchGenCode?tables=' + tbNames, 'ruoyi.zip')
  }
}

/** 同步数据库操作 */
function handleSynchDb(row) {
  const tableName = row.tableName
  proxy.$modal
    .confirm('确认要强制同步"' + tableName + '"表结构吗？')
    .then(function () {
      return synchDb(tableName)
    })
    .then(() => {
      proxy.$modal.msgSuccess('同步成功')
    })
    .catch(() => {})
}
/** 打开导入表弹窗 */
function openImportTable() {
  proxy.$refs['importRef'].show()
}
/** 打开创建表弹窗 */
function openCreateTable() {
  proxy.$refs['createRef'].show()
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = []
  proxy.resetForm('queryRef')
  handleQuery()
}
/** 预览按钮 */
function handlePreview_back(row) {
  previewTable(3337).then((response) => {
    // preview.value.data = response.data
    preview.value.data['vm/vue/index.vue.vm'] =
      response.data['vm/vue/index.vue.vm']
    console.log('preview.value:', preview.value)
    preview.value.open = true
    preview.value.activeName = 'index.vue'
  })
}
async function handlePreview(row) {
  loading.value = true
  let params = {
    id: row.id
  }
  let res = await previewTable2(params)
  loading.value = false
  let { code, data, msg } = res
  
  data.forEach(item=>{
    item.code = JSON.parse(item.code)
  })
  if (code == 200) {
    proxy.$refs['previewCodeRef'].show()
    preview.value.data = data
    preview.value.type = row.type
  }
}
// 生成代码
async function handleGenTableCreate(row) {
  
  loading.value = true
  let params = {
    id: row.id,
    isWrite: true
  }
  let res = await previewTable2(params)
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    proxy.$modal.msgSuccess('生成成功')
  }
}
/** 复制代码成功 */
function copyTextSuccess() {
  proxy.$modal.msgSuccess('复制成功')
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.tableId)
  tableNames.value = selection.map((item) => item.tableName)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 修改按钮操作 */
function handleEditTable(row) {
  router.push({
    path: '/tool/gen-edit/index/' + row.id,
    query: {
      type: row.type
    }
  })
}
/** 删除按钮操作 */
function handleDelete(row) {
  const id = row.id
  proxy.$modal
    .confirm('是否确认删除表编号为"' + id + '"的数据项？')
    .then(function () {
      return handleDeleteModule(id)
    })
}
async function handleDeleteModule (id) {
  let res = await deleteModule({id})
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }
}

getList()
</script>

