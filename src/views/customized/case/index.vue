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
        <!--  -->
        <el-button  type="primary" @click="tableBtnFn('create')">新增</el-button>
      </div>
      <div class="right">
        <!-- 导出 -->
        <el-button  type="success" @click="tableBtnFn('export')" :loading="exportLoading">导出</el-button>
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
        <!-- 查看 -->
        <el-button  size="small" type="primary" @click="tableBtnFn('view', row)" text >查看</el-button>
        <!-- 编辑 -->
        <el-button  size="small" type="primary" @click="tableBtnFn('edit', row)" text >编辑</el-button>
        <!-- 删除 -->
        <el-button  size="small" type="danger"  @click="tableBtnFn('delete', row)" :loading="delLoading" text >删除</el-button>
      </template>
    </TableView>
  </div>
</template>

<script setup name="case">
import { ref } from "vue";
import SearchForm from "@/components/SearchForm"; // 搜索组件
import TableView from "@/components/Table"; // 列表组件
import { ElMessage, ElMessageBox } from "element-plus"; // UI
import { columns, searchConfig, transformData } from './config' // 组件配置信息
import {
        createData, // 新增
        getDetails, // 详情
        updateData, // 更新
        getData, // 列表
        deleteData, // 删除
        exportData, // 导出
} from "@/api/customized/case/index.js"; // 接口

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
        pageSize: pageSize.value
    };
    let params = { ...searchForm.value, ...pageInfo };
    loading.value = true;
    try {
        let res = await getData(params);
        loading.value = false;

        let { code, data, msg } = res;
        if (code == 200) {
            tableData.value = transformData(data.list);
            total.value = data.total;
        }
    } catch (error) {
        loading.value = false;
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
        case 'export':
            exportItem(type, row)
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
    ElMessageBox.confirm("确定删除该咨询记录吗？", "提示", {
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
    try {
        let res = await deleteData(params);
        delLoading.value = false;
        let { code, data, msg } = res;
        if (code == 200) {
            getList();
            ElMessage({
                type: "success",
                message: "删除成功",
            });
        }
    } catch (error) {
        delLoading.value = false;
    }
}

// 导出
async function exportItem() {
    let pageInfo = {
        pageNum: currentPages.value,
        pageSize: 9999,
    };
    let data = { ...searchForm.value, ...pageInfo };
    try {
        exportData(data, proxy, "导出文件名", ".xlsx")
    } catch (error) {
        
    }
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
