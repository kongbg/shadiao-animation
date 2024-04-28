<template>
  <el-form ref="genInfoForm" :model="info" label-width="150px">
    <el-button
      type="primary"
      @click="addDomain"
      style="margin-left: 70px; margin-bottom: 20px"
      >新增接口</el-button
    >
    <el-row :span="24">
      <el-col :span="6">
        <el-form-item label="API模块名称" prop="apiModuleName">
          <el-input placeholder="请输入API模块名称" v-model="info.apiModuleName" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-for="(item, index) in info.domains">
      <el-col :span="6" v-for="(info2, index2) in item.list">
        <el-form-item
          :prop="'domains.' + index + '.list.' + index2 + '.value'"
          :rules="{
            required: true,
            message: '值不能为空',
            trigger: 'blur'
          }"
        >
          <template #label>{{ info2.label }}</template>
          <el-cascader
            popper-class="popper-cascader"
            v-if="index2 == 2"
            v-model="info2.url"
            filterable
            :options="options"
            :props="{ value: 'key', label: 'name' }"
            :show-all-levels="false"
            @change="(data) => urlChange(data, info2)"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <br />
              <span>{{ data.api && data.api.path }}</span>
            </template>
          </el-cascader>
          <el-input
            v-else
            v-model="info2.value"
            :disabled="info2.disabled"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item>
          <el-button type="primary" @click="deleteDomain(index)"
            >删除</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { getApiTreeList } from '@/api/autoCode'

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        domains: [
          {
            list: [
              {
                label: '功能名称',
                value: '新增'
              },
              {
                label: '接口名称',
                value: 'addData'
              },
              {
                label: '接口url',
                value: ''
              }
            ]
          },
          {
            list: [
              {
                label: '功能名称',
                value: '编辑'
              },
              {
                label: '接口名称',
                value: 'editData'
              },
              {
                label: '接口url',
                value: ''
              }
            ]
          },
          {
            list: [
              {
                label: '功能名称',
                value: '查询'
              },
              {
                label: '接口名称',
                value: 'getData'
              },
              {
                label: '接口url',
                value: ''
              }
            ]
          },
          {
            list: [
              {
                label: '功能名称',
                value: '删除'
              },
              {
                label: '接口名称',
                value: 'deleteData'
              },
              {
                label: '接口url',
                value: ''
              }
            ]
          },
          {
            list: [
              {
                label: '功能名称',
                value: '更新'
              },
              {
                label: '接口名称',
                value: 'updateData'
              },
              {
                label: '接口url',
                value: ''
              }
            ]
          }
        ]
      }
    }
  }
})

let genInfoForm = ref(null)
let options = ref([])
async function getApiTreeLists() {
  let res = await getApiTreeList({ locale: 'zh-CN' }, { cache: true })
  if (res.success) {
    options.value = res.data || []
    options.value.forEach((item) => {
      item.children.forEach((info) => {
        info.api = {
          path: `/${info.name}`
        }
      })
    })
  }
}

function deleteDomain(index) {
  props.info.domains.splice(index, 1)
}

function urlChange(data, item) {
  let path = findApiPaths(options.value, data)
  console.log('path:', path, data, item)
  item.value = path.join('/').replace('///', '/').replace('//', '/')
  item.id = getApiId(data)

  function findApiPaths(data, keys) {
    let result = []
    let children = data
    keys.forEach((key) => {
      let info = children.find((item) => item.key == key)
      if (info?.api?.path) {
        item.method = info.api.method
        result.push(info?.api?.path)
      } else {
        result.push('')
      }
      children = info.children || []
    })
    return result
  }

  console.log('item:', item)

  function getApiId(data) {
    let last = data[data.length - 1]
    return last.split('.')[1]
  }
}
function addDomain() {
  props.info.domains.push({
    list: [
      {
        label: '功能名称',
        value: ''
      },
      {
        label: '接口名称',
        value: ''
      },
      {
        label: '接口url',
        value: ''
      }
    ]
  })
}
function getFormData() {
  return props.info
}
defineExpose({
  getFormData
})

getApiTreeLists()
</script>
<style lang="scss">
.popper-cascader {
  .el-cascader-node__label {
    max-width: 200px;
    line-height: 14px;
  }
  .el-cascader-menu__wrap.el-scrollbar__wrap {
    height: 400px;
  }
}
</style>
