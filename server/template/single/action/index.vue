<template>
  <div class="cityAreaBannedManage">
    <TitleBar title="案例基本信息" />
    <el-form
      :model="fromData"
      :rules="rules"
      :loading="loading"
      ref="formRef"
      class="custom-query-form mt20"
      label-position="left"
      label-width="80"
    >
      <el-row justify="space-between">
        <el-col :span="5">
          <el-form-item label="案例标题" prop="title" required>
            <el-input
              v-model="fromData.title"
              :disabled="disabled"
              @change="handleQuery"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="案例类型" prop="caseType" required>
            <el-select
              v-model="fromData.caseType"
              placeholder="请选择"
              :disabled="disabled"
              :clearable="true"
            >
              <el-option
                v-for="op in case_type"
                :label="op.label"
                :value="op.value"
                :key="op.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5"> </el-col>
        <el-col :span="5"> </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-form-item label="案例描述" prop="caseDes">
            <el-input
              v-model="fromData.caseDes"
              :disabled="disabled"
              :rows="2"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-form-item label="附件上传" prop="fileId">
            <FileUpload
              v-model="fromData.fileId"
              :disabled="disabled"
              :isAreaTip="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row
      justify="center"
      v-if="route.query.type != 'view'"
      :gutter="20"
      class="sub_btn"
    >
      <el-button @click="cancel" plain> 取 消 </el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">保 存</el-button>
    </el-row>
  </div>
</template>
<script setup>
  import { ref } from "vue"; // vue
  import { useDict } from "@/utils/dict"; // 字典
  import TitleBar from "@/components/TitleBar"; // 标题组件
  import FileUpload from "@/components/FileUpload"; // 上传组件
  import {
      {{#each apis}}
      {{ this.methodName }}, // {{this.name}}
      {{/each}}
  } from "@/api/{{moduleName}}/index.js"; // 接口

  const { proxy } = getCurrentInstance(); // vue 实例

  const {
    {{#each dicts}}
    {{this}},
    {{/each}}
  } = useDict(
    {{#each dicts}}
    "{{this}}",
    {{/each}}
  )

  const router = useRouter(); // 路由实例
  const route = useRoute(); // 路由对象
  const loading = ref(false); // loading
  const formRef = ref(null); // 表单实例

  // 是否禁用
  const disabled = computed(() => {
    return route.query.type == 'view'
  })

  const fromData = ref({
    {{#each submitParams}}
    {{this.prop}}: {{{this.value}}}, // {{this.label}}
    {{/each}}
  }); // 表单数据

  // 表单校验规则
  const rules = {
    {{#each submitParams}}
    {{this.prop}}: [{ required:{{#if this.required}}{{this.required}}{{else}}false{{/if}}, message: "请选择", trigger: ["change", "blur"] }], // {{this.label}}
    {{/each}}
  };

  // 表单提交
  const submitForm = async () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        let params = {
          ...fromData.value,
          type: 3,
        };
        if (route.query.type == "create") {
          try {
            loading.value = true;
            await {{actions.create.apiName}}(params);
            loading.value = false;
            proxy.$modal.msgSuccess("新增成功");
            setTimeout(() => {
              router.push({
                path: '{{actions.create.openUrl}}'
              });
            }, 1500);
          } catch (error) {
            loading.value = false;
            proxy.$modal.msgError("新增失败");
          }
        } else {
          try {
            loading.value = true;
            await {{actions.edit.apiName}}(params);
            proxy.$modal.msgSuccess("编辑成功");
            loading.value = false;
            setTimeout(() => {
              router.push({
                path: '{{actions.edit.openUrl}}'
              });
            }, 1500);
          } catch (error) {
            loading.value = false;
            proxy.$modal.msgError("编辑失败");
          }
        }
      }
    });
  };

  // 取消按钮
  function cancel() {
    router.push({
      path: '{{actions.view.openUrl}}'
    });
  }

  // 获取详情
  async function getDetail() {
    let params = {
      type: 3,
      id: route.query.id,
    };
    loading.value = true;
    try {
      let res = await {{actions.view.apiName}}(params);
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
.cityAreaBannedManage {
  height: 100%;
  padding: 0 20px 20px;
  .sub_btn {
    padding-bottom: 20px;
  }
}
</style>
