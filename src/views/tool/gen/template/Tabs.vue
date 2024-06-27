<template>
    <el-card>
      <el-tabs
        v-model="editableTabsValue"
        :loading="loading"
        type="card"
        editable
        class="double-tabs"
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.tabName"
          :name="index"
        >
        {{ item.id }}
          <Single :configs="item.config" :id="item.id"></Single>
        </el-tab-pane>
      </el-tabs>

      <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
        <el-form :model="form">
          <el-form-item label="标签名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="saveTabName">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
    
  </template>
  
  <script setup name="GenEdit">
  import { addConfig  } from '@/api/autoCode'
  import { onMounted, ref } from 'vue';
  import Single from './Single.vue'
  const route = useRoute()

  const props = defineProps({
    configs: {
      type: Array,
      default: ()=>[]
    }
  })
  const editableTabsValue = ref(0)
  let tabIndex = 2
  let editableTabs = ref([])

  let dialogFormVisible = ref(false)
  let form = ref({})

  const loading = ref(false)
  async function handleAddConfig(params) {
    loading.value = true
    let res = await addConfig(params)
    loading.value = false
    let { code, data, msg } = res
    if (code == 200) {
      editableTabs.value.push(params)
      editableTabsValue.value = editableTabs.length
    }
  }

const handleTabsEdit = async (targetName, action) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    let params = {
      tabName: 'New Tab',
      name: newTabName,
      tabId: '',
      type: '2',
      mid: route.params.id
    }
    await handleAddConfig(params)
    
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

let current = 0
function saveTabName() {
  editableTabs.value[current].tabName = form.value.name
  dialogFormVisible.value = false
  form.value.name = ''
}
function initDoubleClick(){
  let tabs = document.querySelectorAll('.double-tabs')
  tabs[0].addEventListener('dblclick', function(event) {
    // 这里是双击后要执行的代码
    if ([...event.target.classList].includes('el-tabs__item')) {
      current = event.target.tabIndex
      form.value.name = event.target.innerText
      dialogFormVisible.value = true
    }
  });
}


function init() {
    props.configs.forEach(item => {
      let obj = {
        tabName: item.baseInfo.tabName || 'New Tab',
        name: 'newTabName',
        tabId: item.baseInfo.tabId,
        id: item.id,
        config: [item]
      }

      editableTabs.value.push(obj)
    })
  }
init()
onMounted(()=>{
  setTimeout(()=>{
    // 监听双击事件
    initDoubleClick()
  })
})
  </script>
  