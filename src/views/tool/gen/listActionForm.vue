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
        label: '调用api名称',
        value: 'createData',
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
      },
      {
        prop: 'showExpression',
        label: '显示隐藏表达式',
        value: '',
        type: 'input'
      }
    ]
  },
  {
    name: '导出',
    key: 'export',
    list: [
      {
        prop: 'show',
        label: '是否显示',
        value: true,
        type: 'checkbox'
      },
      {
        prop: 'apiName',
        label: '调用api名称',
        value: 'exportData',
        disabled: true,
        type: 'input'
      },
      {
        prop: 'btnTxt',
        label: '文案',
        value: '导出',
        type: 'input'
      },
      {
        prop: 'type',
        label: '按钮类型',
        value: 'success',
        type: 'select',
        options: options1
      },
      {
        prop: 'feilName',
        label: '文件名',
        value: '导出文件名',
        type: 'input'
      },
      {
        prop: 'suffix',
        label: '后缀',
        value: '.xlsx',
        type: 'input'
      },
      {
        prop: 'showExpression',
        label: '显示隐藏表达式',
        value: '',
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
        label: '调用api名称',
        value: 'updateData',
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
      },
      {
        prop: 'showExpression',
        label: '显示隐藏表达式',
        value: '',
        type: 'input'
      }
    ]
  },
  {
    name: '查看',
    key: 'view',
    list: [
      {
        prop: 'show',
        label: '是否显示',
        value: true,
        type: 'checkbox'
      },
      {
        prop: 'apiName',
        label: '调用api名称',
        value: 'getDetails',
        disabled: true,
        type: 'input'
      },
      {
        prop: 'btnTxt',
        label: '文案',
        value: '查看',
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
      },
      {
        prop: 'showExpression',
        label: '显示隐藏表达式',
        value: '',
        type: 'input'
      }
    ]
  },
  {
    name: '删除',
    key: 'delete',
    list: [
      {
        prop: 'show',
        label: '是否显示',
        value: true,
        type: 'checkbox'
      },
      {
        prop: 'apiName',
        label: '调用api名称',
        value: 'deleteData',
        disabled: true,
        type: 'input'
      },
      {
        prop: 'btnTxt',
        label: '文案',
        value: '删除',
        type: 'input'
      },
      {
        prop: 'type',
        label: '按钮类型',
        value: 'danger',
        type: 'select',
        options: options1
      },
      {
        prop: 'tips',
        label: '提示文案',
        value: '确定删除该咨询记录吗？',
        type: 'input'
      },
      {
        prop: 'showExpression',
        label: '显示隐藏表达式',
        value: '',
        type: 'input'
      }
    ]
  },
  {
    name: '列表接口',
    key: 'list',
    list: [
      {
        prop: 'apiName',
        label: '调用api名称',
        value: 'getData',
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
