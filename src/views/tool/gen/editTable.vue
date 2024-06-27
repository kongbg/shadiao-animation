<template>
  <div>
    <Single v-if="show && type == 1" :configs="configs" :id="route.params.id"></Single>
    <Tabs v-if="show && type == 2" :configs="configs"></Tabs>
  </div>
</template>

<script setup name="GenEdit">
import { getConfigs } from '@/api/autoCode'
import Single from './template/Single'
import Tabs from './template/Tabs'
import { ref } from 'vue';
const route = useRoute()

let type = route.query.type

const loading = ref(false)
const configs = ref([])
const show = ref(false)
let domains = {
  domains: [
    {
      list: [
        {
          label: '功能名称',
          value: '新增',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'createData',
          disabled: true,
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
          value: '详情',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'getDetails',
          disabled: true,
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
          value: '更新',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'updateData',
          disabled: true,
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
          value: '列表',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'getData',
          disabled: true,
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
          value: '删除',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'deleteData',
          disabled: true,
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
          value: '导出',
          disabled: true,
        },
        {
          label: '接口名称',
          value: 'exportData',
          disabled: true,
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    }
  ]
}
async function getItemDetail() {
    loading.value = true
    let params = {
      mid: route.params.id, 
      page: 1,
      pageSize: 100
    }
    let res = await getConfigs(params)
    let { code, data, msg } = res
    console.log('res:', res)
    if (code == 200) {
      data.data.forEach(item => {
        item.apiconfig = JSON.parse(item.apiconfig || JSON.stringify(domains))
        item.queryColumn = JSON.parse(item.queryColumn || JSON.stringify([]))
        item.listColumn = JSON.parse(item.listColumn || JSON.stringify([]))
        item.listActions = JSON.parse(item.listActions || JSON.stringify([]))
        item.addColumn = JSON.parse(item.addColumn || JSON.stringify([]))
        item.editColumn = JSON.parse(item.editColumn || JSON.stringify([]))
        item.detailColumn = JSON.parse(item.detailColumn || JSON.stringify([]))
        item.editActions = JSON.parse(item.editActions || JSON.stringify([]))
        item.baseInfo = {
          name: item.name,
          desc: item.desc,
          type: item.type || '1',
          moduleName: item.moduleName || '',
          path: item.path || '',
          apiFolder: item.apiFolder || '',
          pageFolder: item.pageFolder || '',
          codePath: item.codePath || '',
          tabId: item.tabId || '',
          tabName: item.tabName || ''
        }
        console.log('item.baseInfo:', item.baseInfo)
        

        item.apiconfig.domains.forEach((info) => {
          if (info.list[1].value == 'createData') {
            item.createDataApiId = info.list[2]?.id
          }
    
          if (info.list[1].value == 'getData') {
            item.getDataApiId = info.list[2]?.id
          }
        })
      })

      configs.value = data.data
      show.value = true
    }
    loading.value = false
}
  getItemDetail()

</script>
