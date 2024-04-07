<template>
    <div class="list-page">
        <SearchForm :config="searchConfig" @search="search"></SearchForm>
        <div class="table-tools">
            <div class="left">
                <el-button type="primary" @click="handleAdd">上传</el-button>
            </div>
            <div class="right"></div>
        </div>
        <Table :columns="columns" :loading="loading" :tableData="tableData" :total="total" :pageSize="pageInfo.pageSize"
            :currentPage="pageInfo.pageNum">
            <template #path="{row}">
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
            <template #action="{row}">
                <el-button>删除</el-button>
            </template>
        </Table>


        <!-- 添加或修改参数配置对话框 -->
      <el-dialog :title="title" v-model="open" width="50%" append-to-body>
         <!-- <el-form ref="dataRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="字典类型">
               <el-input v-model="form.dictType" :disabled="true" />
            </el-form-item>
         </el-form> -->
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
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="uploadFiles">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>
    </div>
</template>
<script setup>
import { ref, defineProps, reactive, toRefs } from 'vue';
import { upload, getFiles } from '@/api/source/index.js'
import Table from '@/components/Table'
import SearchForm from '@/components/SearchForm'

const { proxy } = getCurrentInstance()
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
    pageSize: 20,
})
const open = ref(false);
const title = ref("");
const data = reactive({
  form: {},
  rules: {
    dictType: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
  }
});
const { form, rules } = toRefs(data);
const fileList = ref([])

function search(data={}) {
    pageInfo.pageNum = 1;
    getList(data)
}

/** 获取列表数据 **/
async function getList(searchForm) {
    let params = {
        page: pageInfo.pageNum,
        pageSize: pageInfo.pageSize,
        type: 1,
        purpose: props.activeName,
        ...searchForm
    }
    loading.value = true;
    let res = await getFiles(params);
    loading.value = false;
    let { code, data, msg } = res;
    if (code == 200) {
        tableData.value = data.data || [];
        total.value = data.total;
        tableData.value.forEach(item => {
            item.path = `http://127.0.0.1:3006${item.path}`;
            item.size = `${(item.size / 1000)}kb`
            srcList.value.push(item.path);
        })
    }
}

function handlePictureCardPreview() {

}
function handleRemove() {
    
}
async function uploadFiles() {
    let fileData = new FormData();
    fileList.value.forEach(item => {
        fileData.append('file', item.raw);
    })
    fileData.append('userId', '001');
    fileData.append('userName', 'admin');
    fileData.append('type', '1');
    fileData.append('purpose', props.activeName);
    
    let res = await upload(fileData);
    console.log('res:', res)
    if (res.code == 200) {
        proxy.$modal.msgSuccess("上传成功");
        cancel();
        search();
    }
}
function cancel () {
    fileList.value = [];
    open.value = false;
}
/** 表单重置 */
function reset() {
 
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "上传图片";
}

getList();
</script>
<style lang="scss" scoped>
.list-page {
    .table-tools {
        margin-bottom: 10px;
    }
}
</style>