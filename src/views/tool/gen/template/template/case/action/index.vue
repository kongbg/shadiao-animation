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
      <el-button type="primary" :loading="loading" @click="submitForm"
        >保 存</el-button
      >
    </el-row>
  </div>
</template>
<script setup>
  import TitleBar from "@/components/TitleBar";
  import FileUpload from "@/components/FileUpload";
  import {
      {{#each apis}}
      {{ this.methodName }}, // {{this.name}}
      {{/each}}
  } from "@/api/{{compName}}/index.js"; // 接口
  import { ref } from "vue";
  import { useDict } from "@/utils/dict";

  const { proxy } = getCurrentInstance();

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
    // 表单校验规则
    const rules = {
      caseType: [{ required: true, message: "请选择案例类型", trigger: "change" }],
      title: [{ required: true, message: "请输入案例标题", trigger: "blur" }],
      caseDes: [{ required: true, message: "请输入案例描述", trigger: "blur" }],
      fileId: [{ required: true, message: "请上传文件", trigger: "blur" }],
    };

    // 是否禁用
    const disabled = computed(() => {
      return route.query.type == 'view'
    })

    const formRef = ref(null); // 表单实例
    const fromData = ref({}); // 表单数据

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
              await addData(params);
              proxy.$modal.msgSuccess("新增成功");
              setTimeout(() => {
                router.push({
                  path: 'index'
                });
              }, 1500);
            } catch (error) {
              proxy.$modal.msgError("新增失败");
            }
          } else {
            try {
              await update(params);
              proxy.$modal.msgSuccess("编辑成功");
              setTimeout(() => {
                router.push({
                  path: 'index'
                });
              }, 1500);
            } catch (error) {
              proxy.$modal.msgError("编辑失败");
            }
          }
        }
      });
    };
    // 取消按钮
    function cancel() {
      router.push("index");
    }

    const loading = ref(false);
    async function getDetail() {
      let params = {
        type: 3,
        id: route.query.id,
      };
      loading.value = true;
      let res = await getDetails(params);
      loading.value = false;
      let { code, data, msg } = res;
      if (code == 200) {
        fromData.value = {
          id: data.id,
          title: data.title,
          caseType: data.caseType,
          caseDes: data.caseDes,
          fileId: data.fileId,
        };
      }
    }

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