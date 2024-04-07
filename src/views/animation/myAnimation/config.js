

// 生成搜索表单
function createSearchConfig () {
    let config = [
        { type: "input", label: "图片名称：", prop: "key1", clearable: true },
    ]
    return config;
}
// 生成table表头
function createColumns () {
    let columns = [
        {
            label: 'id',
            prop: 'id',
            width: '180'
        },
        {
            label: '名称',
            prop: 'name',
        },
        {
            label: '类型',
            prop: 'type',
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
            prop: 'userName',
        },
        {
            label: '状态',
            prop: 'status'
        },
        {
            label: '操作',
            slot: 'action',
        },
    ]
    return columns;
}
// tab配置
export const allTabList = [
    {
        label: "我的动画",
        name: "myAnimation",
    }
];
export default {
    "default": {
        tabList: ['myAnimation'],
        tabShow: false,
        columns: {
            'myAnimation': createColumns(),
        },
        searchConfig: {
            'myAnimation': createSearchConfig(),
        }
    }
}