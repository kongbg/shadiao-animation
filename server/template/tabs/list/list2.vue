<template>
  <div class="search-form mt10">
    <searchForm
      :userType="2"
      :config="formData2"
      @submit="handleSubmit"
      @reset="handleReset"
    />
  </div>
  <div class="custom-operation-btns mb10">
    <el-button type="primary" @click="add">新增电子印章</el-button>
  </div>
  <div class="table-container">
    <TableView
      :loading="tableLoading"
      :columns="tableColumns"
      :tableData="tableData"
      :currentChange="handleCurrentChange"
      :sizeChange="handleSizeChange"
      :pageSize="page.pageSize"
      :currentPage="page.pageNum"
      :total="page.total"
      :handleSelection="selectChange"
    >
      <!-- <template #status="{ row }">
          <dict-tag :options="sys_normal_disable" :value="row.status"
          /></template> -->
      <template #action="{ row }">
        <div class="custom-table-btns">
          <el-button type="primary" @click="detail(row)" text>详情</el-button>
          <el-button
            :type="row.sealStatus == 0 ? 'danger' : 'primary'"
            @click="accountStatus(row)"
            text
          >
            {{ row.sealStatus == 0 ? '停用' : '启用' }}
          </el-button>
        </div>
      </template>
    </TableView>
  </div>
  <el-dialog
    title="提示"
    v-model="tips"
    width="30%"
    :before-close="true"
    :align-center="true"
  >
    <span
      >请前往“深圳电子印章”微信小程序或“i深圳”手机APP进行电子印章的申请、授权、领取。</span
    >
    <template #footer>
      <span>
        <el-button type="primary" @click="tips = false">确认</el-button>
        <el-button @click="tips = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { getData, update } from '@/api/electronSealApp'
import searchForm from '@/components/SearchForm'
import TableView from '@/components/Table'
import { formData2, columns2 } from '../config'
import { ElMessage, ElMessageBox } from 'element-plus'

const { proxy } = getCurrentInstance()

const detail = (row) => {
  router.push({
    path: 'action',
    query: { id: row.id }
  })
}

const router = useRouter()
const tableColumns = columns2
const tableData = ref([])
const page = reactive({
  total: 1,
  pageSize: 10,
  pageNum: 1
})

const tableLoading = ref(false)
const queryForm = ref({})
// 获取列表数据
const getList = () => {
  const params = {
    ...queryForm.value,
    ...page,
    userType: 1 // 用户类型 (0政务侧 1公众测)
  }
  tableLoading.value = true
  getData(params)
    .then(({ data }) => {
      const { list, total } = data || {}
      tableData.value = list
      page.total = Number(total)
    })
    .finally(() => {
      tableLoading.value = false
    })
}

// 新增提示
const tips = ref(false)
function add() {
  tips.value = true
}

// 搜索
function handleSubmit(data) {
  queryForm.value = data
  page.pageNum = 1
  getList()
}

// 重置搜索条件
function handleReset() {
  queryForm.value = {}
  getList()
}

// 页面变化
const handleCurrentChange = (pageNum) => {
  page.pageNum = pageNum
  getList()
}

// 启用/停用
function accountStatus(row) {
  let statusTxt = row.sealStatus == 0 ? '停用' : '启用'
  ElMessageBox.confirm(`确定${statusTxt}该电子印章吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      let params = {
        id: row.id,
        status: row.sealStatus == 0 ? '1' : '0'
      }
      update(params)
        .then(({ data }) => {
          let msg = `${statusTxt}成功！`
          ElMessage({
            type: 'syccess',
            message: msg
          })
          getList()
        })
        .finally(() => {})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作'
      })
    })
}

getList()
</script>

<style scoped>
.electronSealApp {
  height: 100%;
  padding: 0 20px 20px;
}
</style>
