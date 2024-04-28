<template>
  <div class="action-config">
    <div class="action" v-for="act in action">
      <div class="title">{{ act.name }}：</div>
      <div class="item" v-for="item in act.list">
        <div class="label">{{ item.label }}</div>
        <div class="value" v-if="item.type == 'checkbox'">
          <el-checkbox v-model="item.value"></el-checkbox>
        </div>
        <div class="value" v-if="item.type == 'input'">
          <el-input v-model="item.value" :disabled="item.disabled"></el-input>
        </div>
        <div class="value" v-if="item.type == 'select'">
          <el-select v-model="item.value" placeholder="请选择">
            <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="ReqForm">
const props = defineProps({
  apiId: {
    type: String,
    default: ''
  },
  actions: {
    type: Array,
    default: () => []
  }
})

const options1 = [
  {
    label: 'primary',
    value: 'primary'
  },
  {
    label: 'success',
    value: 'success'
  },
  {
    label: 'info',
    value: 'info'
  },
  {
    label: 'warning',
    value: 'warning'
  },
  {
    label: 'danger',
    value: 'danger'
  }
]

const options2 = [
  {
    label: '跳转',
    value: '1'
  },
  {
    label: '弹窗',
    value: '2'
  }
]

const action = ref([
  {
    name: '新增',
    key: 'create',
    list: [
      {
        prop: 'show',
        label: '是否显示',
        value: true,
        type: 'checkbox'
      },
      {
        prop: 'apiName',
        label: 'api名称',
        value: 'addData',
        disabled: true,
        type: 'input'
      },
      {
        prop: 'btnTxt',
        label: '文案',
        value: '新增',
        type: 'input'
      },
      {
        prop: 'type',
        label: '按钮类型',
        value: 'primary',
        type: 'select',
        options: options1
      },
      {
        prop: 'openType',
        label: '打开方式',
        value: '1',
        type: 'select',
        options: options2
      },
      {
        prop: 'openUrl',
        label: '跳转地址',
        value: 'action',
        type: 'input'
      }
    ]
  },
  {
    name: '编辑',
    key: 'edit',
    list: [
      {
        prop: 'show',
        label: '是否显示',
        value: true,
        type: 'checkbox'
      },
      {
        prop: 'apiName',
        label: 'api名称',
        value: 'update',
        disabled: true,
        type: 'input'
      },
      {
        prop: 'btnTxt',
        label: '文案',
        value: '编辑',
        type: 'input'
      },
      {
        prop: 'type',
        label: '按钮类型',
        value: 'primary',
        type: 'select',
        options: options1
      },
      {
        prop: 'openType',
        label: '打开方式',
        value: '1',
        type: 'select',
        options: options2
      },
      {
        prop: 'openUrl',
        label: '跳转地址',
        value: 'action',
        type: 'input'
      }
    ]
  },
  {
    name: '详情接口',
    key: 'view',
    list: [
      {
        prop: 'apiName',
        label: 'api名称',
        value: 'getDetails',
        disabled: true,
        type: 'input'
      }
    ]
  },
])














/** 提交按钮 */
function getFormData() {
  return  action.value
}

async function init() {
  if (props.actions.length) {
    action.value = props.actions
  }
}

init()

defineExpose({
  getFormData
})
</script>
<style lang="scss" scoped>

.action-config {
  .action {
    display: flex;
    .title {
      width: 80px;
    }
    .item {
      margin-left: 20px;
      margin-bottom: 15px;
    }
  }
  &.hide {
    height: 0;
    overflow: hidden;
  }
}
</style>
