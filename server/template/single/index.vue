<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="search-form">
      <SearchForm
        :config="searchConfig"
        @reset="reset"
        @submit="search"
      ></SearchForm>
    </div>

    <!-- 列表工具 -->
    <div class="toble-tools">
      <div class="left">
        <el-button type="primary" @click="tableBtnFn('create')"
          >上传案例</el-button
        >
      </div>
      <div class="right">
        <el-button type="success" @click="exportData" :loading="exportLoading"
          >导出</el-button
        >
      </div>
    </div>

    <!-- 列表 -->
    <TableView
      :columns="columns"
      :tableData="tableData"
      :currentChange="handleCurrentChange"
      :sizeChange="handleSizeChange"
      :pageSize="pageSize"
      :currentPage="currentPages"
      :total="total"
      :loading="loading"
    >
      <template #action="{ row }">
        <el-button
          size="small"
          type="primary"
          @click="tableBtnFn('view', row)"
          text
          >查看</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="tableBtnFn('edit', row)"
          text
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="tableBtnFn('delete', row)"
          :loading="delLoading"
          text
          >删除</el-button
        >
      </template>
    </TableView>
  </div>
</template>

<script setup name="{{compName}}">
import SearchForm from "@/components/SearchForm";
import TableView from "@/components/Table";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import { columns, searchConfig, transformData } from './config' // 组件配置信息
import {
    {{#each apis}}
        {{this.methodName}}, // {{this.name}}
    {{/each}}
} from "@/api/{{compName}}/index.js"; // 接口

const router = useRouter(); // 路由实例
const { proxy } = getCurrentInstance();

const searchForm = ref({}); // 搜索组件的结果
const loading = ref(false); // 列表loading
const delLoading = ref(false); // 删除按钮loading
const exportLoading = ref(false); // 导出按钮loading
const total = ref(0); // 列表总数
const tableData = ref([]); // 列表数据
const pageSize = ref(10); // 每页条数
const currentPages = ref(1); // 当前页码

// 查询列表
async function getList() {
    let pageInfo = {
        pageNum: currentPages.value,
        pageSize: pageSize.value,
        type: 3, // 审核类型（1-政策解读文件共享； 2-业务学习平台； 3-建筑废弃物案例展示 ）
    };
    let params = { ...searchForm.value, ...pageInfo };
    loading.value = true;

    let res = await {{getDataApiName}}(params);
    loading.value = false;

    let { code, data, msg } = res;
    if (code == 200) {
        tableData.value = transformData(data.list);
        total.value = data.total;
    }
}

// 列表操作
function tableBtnFn(type, row) {
    switch (type) {
        case 'create':
            createItem(type, row)
            break;
        case 'edit':
            editItem(type, row)
            break;
        case 'view':
            viewItem(type, row)
            break;
        case 'delete':
            deleteItem(type, row)
            break;
        default:
    }
}
// 新增
function createItem(type, row) {
    router.push({
        path: 'action',
        query: {
            type: type,
        },
    });
}
// 编辑
function editItem(type, row) {
    router.push({
        path: 'action',
        query: {
            type: type,
            id: row.id,
        },
    });
}
// 查看
function viewItem(type, row) {
    router.push({
        path: 'action',
        query: {
            type: type,
            id: row.id,
        },
    });
}
// 删除
function deleteItem(type, row) {
    ElMessageBox.confirm("{{deleteTip}}", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            handleDelete(row.id);
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "取消操作",
            });
        });
}
// 删除信息
async function handleDelete(id) {
    let params = [id]
    delLoading.value = true;
    let res = await {{delateApiName}}(params);
    delLoading.value = false;
    let { code, data, msg } = res;
    if (code == 200) {
        getList();
        ElMessage({
            type: "success",
            message: "删除成功",
        });
    }
}

// 导出
async function exportData() {
    let pageInfo = {
        pageNum: currentPages.value,
        pageSize: 9999,
    };
    let data = { ...searchForm.value, ...pageInfo };
    proxy.download(
        "{{exportUrl}}",
        data,
        `{{exportFeilName}}_${new Date().getTime()}{{suffix}}`
    );
}

// 页码变化
function handleCurrentChange(pageNum) {
    currentPages.value = pageNum;
    getList();
}
// 每页条数变化
function handleSizeChange(size) {
    pageSize.value = size;
    getList();
}

// 重置搜索条件
function reset(data) {
    searchForm.value = data;
    getList();
}
// 搜索
function search(data) {
    searchForm.value = data;
    getList();
}

// 获取列表数据
getList();
</script>

<style lang="scss" scoped>
.app-container {
  overflow: auto;
  height: 100%;
}
</style>
