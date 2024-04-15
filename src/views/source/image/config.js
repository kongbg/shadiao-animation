// 生成搜索表单
function createSearchConfig() {
  let config = [
    { type: 'input', label: '图片名称：', prop: 'key1', clearable: true }
  ]
  return config
}
// 生成table表头
function createColumns() {
  let columns = [
    {
      label: 'id',
      prop: 'id',
      width: '180'
    },
    {
      label: '名称',
      prop: 'fileName'
    },
    {
      label: '类型',
      prop: 'type'
    },
    {
      label: '大小',
      prop: 'size'
    },
    {
      label: '链接',
      slot: 'path',
      name: 'path'
    },
    {
      label: '上传者',
      prop: 'userName'
    },
    {
      label: '状态',
      prop: 'status'
    },
    {
      label: '操作',
      slot: 'action'
    }
  ]
  return columns
}
// tab配置
export const allTabList = [
  {
    label: '背景',
    name: 'background',
    zIndex: 1
  },
  {
    label: '人物',
    name: 'person',
    zIndex: 10
  },
  {
    label: '表情',
    name: 'face',
    zIndex: 40
  },
  {
    label: '头部',
    name: 'head',
    zIndex: 30
  },
  {
    label: '头发',
    name: 'hair',
    zIndex: 50
  },
  {
    label: '躯干',
    name: 'body',
    zIndex: 20
  },
  {
    label: '手',
    name: 'hand',
    zIndex: 10
  },
  {
    label: '脚',
    name: 'foot',
    zIndex: 10
  },
  {
    label: '武器',
    name: 'weapon',
    zIndex: 100
  },
  {
    label: '特效',
    name: 'effect',
    zIndex: 100
  }
]
let tabList = []
let columns = {}
let searchConfig = {}
let imageInfo = {}
allTabList.forEach((item) => {
  tabList.push(item.name)
  columns[item.name] = createColumns()
  searchConfig[item.name] = createSearchConfig()
  imageInfo[item.name] = item
})
export default {
  default: {
    tabList,
    columns,
    searchConfig,
    imageInfo
  }
}
