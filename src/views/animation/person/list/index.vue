<template>
  <div class="list-page">
    <SearchForm :config="searchConfig" @search="search"></SearchForm>
    <div class="table-tools">
      <div class="left">
        <!-- <el-button type="primary" @click="handleAdd">上传</el-button> -->
        <el-button type="primary" @click="handleEditData('create')"
          >新增</el-button
        >
      </div>
      <div class="right"></div>
    </div>
    <Table
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :total="total"
      :pageSize="pageInfo.pageSize"
      :currentPage="pageInfo.pageNum"
    >
      <template #path="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="`${row.path}`"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="srcList"
          :preview-teleported="true"
          :initial-index="4"
          fit="cover"
        />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="handleRemoveData(row)"
          >删除</el-button
        >
        <el-button type="primary" link @click="handleEditData('edit', row)"
          >编辑</el-button
        >
      </template>
    </Table>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" v-model="open" width="50%" append-to-body>
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        multiple
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Image" />
      </el-dialog>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="uploadFiles">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加或修改精灵对话框 -->
    <el-dialog
      :title="schemaDialog.title"
      v-model="schemaDialog.show"
      custom-class="deagin-dialog"
      :fullscreen="!true"
      :close-on-click-modal="false"
      :show-close="false"
      width="95%"
      append-to-body
    >
      {{ schemaDialog.show }}
      <!-- 设计页面 -->
      <Desgin
        v-if="schemaDialog.show"
        ref="desginRef"
        :id="schemaDialog.id"
      ></Desgin>
      <!-- 名称 -->
      <el-dialog v-model="schemaDialog.nameShow" title="名称" width="500">
        <el-input v-model="schemaDialog.name"></el-input>
        <template #footer>
          <div class="dialog-footer">
            <!-- <el-button @click="schemaNameDialogCancel">取 消</el-button> -->
            <el-button type="primary" @click="schemaNameDialogConfirm">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="schemaDialogConfirm"
            >保 存</el-button
          >
          <el-button @click="schemaDialogCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineProps, reactive, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  getLists,
  saveSchema,
  deleteData,
  updateData
} from '../api/schema/index.js'
import Table from '@/components/Table'
import Desgin from '../desgin'
import SearchForm from '@/components/SearchForm'
import useUserStore from '@/store/modules/user'

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  searchConfig: {
    type: Array,
    default: () => []
  },
  activeName: {
    type: String,
    default: ''
  }
})

const loading = ref(false)
const tableData = ref([])
const srcList = ref([])
const total = ref(0)
const pageInfo = reactive({
  pageNum: 1,
  pageSize: 20
})
const open = ref(false)
const title = ref('')
const data = reactive({
  form: {},
  rules: {
    dictType: [{ required: true, message: '数据标签不能为空', trigger: 'blur' }]
  }
})
const { form, rules } = toRefs(data)
const fileList = ref([])

function search(data = {}) {
  pageInfo.pageNum = 1
  getList(data)
}

/** 获取列表数据 **/
async function getList(searchForm) {
  let params = {
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    ...searchForm
  }
  loading.value = true
  let res = await getLists(params)
  loading.value = false
  let { code, data, msg } = res
  if (code == 200) {
    tableData.value = data.data || []
    total.value = data.total
    tableData.value.forEach((item) => {
      item.path = `http://127.0.0.1:3006${item.path}`
      item.size = `${item.size / 1000}kb`
      srcList.value.push(item.path)
    })
  }
}
// 删除列表数据
function handleRemoveData(row) {
  ElMessageBox.confirm('确定删除该条数据?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let params = {
        id: row.id
      }
      let res = await deleteData(params)

      let { code, data, msg } = res
      if (code == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getList()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作'
      })
    })
}
// 编辑
function handleEditData(type, row) {
  if (type == 'create') {
    schemaDialog.id = ''
    schemaDialog.name = ''
    handleAddSchema()
  } else if (type == 'edit') {
    handleAddSchema('编辑')
    schemaDialog.id = row.id
    schemaDialog.name = row.name
  }
}

function handlePictureCardPreview() {}
function handleRemove() {}
// async function uploadFiles() {
//   let fileData = new FormData()
//   fileList.value.forEach((item) => {
//     fileData.append('file', item.raw)
//   })
//   const { userName, userId } = userStore.userInfo
//   fileData.append('userId', userId)
//   fileData.append('userName', userName)
//   fileData.append('type', '1')
//   fileData.append('purpose', props.activeName)

//   let res = await upload(fileData)
//   if (res.code == 200) {
//     proxy.$modal.msgSuccess('上传成功')
//     cancel()
//     search()
//   }
// }
function cancel() {
  fileList.value = []
  open.value = false
}
/** 表单重置 */
function reset() {}
/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = '上传图片'
}

/** schema相关-start */
let desginRef = ref(null)
let schemaDialog = reactive({
  show: false,
  nameShow: false,
  name: '',
  id: '',
  title: '新增'
})
function handleAddSchema(title = '新增') {
  schemaDialog.show = true
  schemaDialog.title = title
}
function schemaDialogConfirm() {
  schemaDialog.nameShow = true
}
function schemaDialogCancel() {
  schemaDialog.id = ''
  schemaDialog.show = false
}
function schemaNameDialogCancel() {
  schemaDialog.nameShow = false
  schemaDialog.name = ''
}
async function schemaNameDialogConfirm() {
  let name = schemaDialog.name
  schemaNameDialogCancel()
  let schemas = desginRef.value.getSchemas() || []
  let params = {
    name,
    purpose: 'person',
    schema: JSON.stringify(schemas)
  }
  if (schemaDialog.id) {
    params.id = schemaDialog.id
    let res = await updateData(params)
    let { code, data, msg } = res
    if (code == 200) {
      schemaDialog.show = false
      ElMessage({
        type: 'success',
        message: '编辑成功'
      })
      getList()
    }
  } else {
    let res = await saveSchema(params)
    let { code, data, msg } = res
    if (code == 200) {
      schemaDialog.show = false
      ElMessage({
        type: 'success',
        message: '新增成功'
      })
      getList()
    }
  }

  schemaDialog.id = ''
}
/** schema相关-end */

getList()
</script>
<style lang="scss" scoped>
.list-page {
  .table-tools {
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.deagin-dialog {
  .donghua__warpper {
    height: 630px;
    .pannelPeer {
      flex-shrink: inherit;
    }
  }
}
</style>
