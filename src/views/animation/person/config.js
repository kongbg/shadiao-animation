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
      prop: 'id'
      //   width: '180'
    },
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: '类型',
      prop: 'purpose'
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
    imageInfo,
    tabShow: false
  }
}
