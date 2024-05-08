<template>
  <div class="action">
    
    <Form ref="formRef" :fromData="fromData" :rules="rules"></Form>

    <el-row
      v-if="route.query.type != 'view'"
      justify="center"
      :gutter="20"
      class="sub_btn"
    >
      <!-- 取消 -->
      <el-button v-if="['edit', 'create'].includes(route.query.type)" @click="cancel" type="primary"> 取消 </el-button>

      <!-- 返回 -->
      <el-button v-if="['view'].includes(route.query.type)" @click="cancel" type="primary"> 返回 </el-button>

      <!-- 新增 -->
      <el-button v-if="['create'].includes(route.query.type)" type="primary" @click="submitForm"> 新增 </el-button>

      <!-- 编辑 -->
      <el-button v-if="['edit'].includes(route.query.type)" type="primary" @click="submitForm"> 编辑 </el-button>
    </el-row>
  </div>
</template>
<script setup>
  import { ref } from "vue"; // vue
  import Form from './form.vue' // 表单组件
  import {
      createData, // 新增
      getDetails, // 详情
      updateData, // 更新
      getData, // 列表
      deleteData, // 删除
      exportData, // 导出
  } from "@/api/customized/case/index.js"; // 接口

  const { proxy } = getCurrentInstance(); // vue 实例

  const router = useRouter(); // 路由实例
  const route = useRoute(); // 路由对象
  const loading = ref(false); // loading
  const formRef = ref(null); // 表单实例

  const fromData = ref({
    createBy: '', // 创建人
    createTime: '', // 创建时间
    updateBy: '', // 更新人
  }); // 表单数据

  // 表单校验规则
  const rules = {
    createBy: [{ required:false, message: "请选择", trigger: ["change", "blur"] }], // 创建人
    createTime: [{ required:false, message: "请选择", trigger: ["change", "blur"] }], // 创建时间
    updateBy: [{ required:false, message: "请选择", trigger: ["change", "blur"] }], // 更新人
  };

  // 表单提交
  const submitForm = async () => {
    let data = formRef.value.getFormData()
    let params = {
      ...data
    };
    if (route.query.type == "create") {
      try {
        loading.value = true;
        let res = await createData(params);
        loading.value = false;
        let { code, data, msg } = res;
        if (code == 200) {
          proxy.$modal.msgSuccess("新增成功");
          setTimeout(() => {
            router.push({
              path: 'index'
            });
          }, 1500);
        }
      } catch (error) {
        loading.value = false;
      }
    } else {
      try {
        loading.value = true;
        let res = await updateData(params);
        let { code, data, msg } = res;
        if (code == 200) {
          proxy.$modal.msgSuccess("编辑成功");
          loading.value = false;
          setTimeout(() => {
            router.push({
              path: 'index'
            });
          }, 1500);
        }
      } catch (error) {
        loading.value = false;
      }
    }
  };

  // 取消按钮
  function cancel() {
    router.push({
      path: 'index'
    });
  }

  // 获取详情
  async function getDetail() {
    let params = {
      id: route.query.id,
    };
    loading.value = true;
    try {
      let res = await getDetails(params);
      loading.value = false;
      let { code, data, msg } = res;
      if (code == 200) {
        fromData.value = data
      }
    } catch (error) {
      loading.value = false;
    }
  }

  // 判断是否需要获取详情
  if (["view", "edit"].includes(route.query.type)) {
    getDetail();
  }
</script>

<style scoped lang="scss">
.action {
  height: 100%;
  padding: 0 20px 20px;
  .sub_btn {
    padding-bottom: 20px;
  }
}
</style>
