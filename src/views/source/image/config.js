

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
            prop: 'fileName',
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
        label: "背景",
        name: "background",
    },
    {
        label: "人物",
        name: "person",
    },
    {
        label: "表情",
        name: "face",
    },
    {
        label: "武器",
        name: "weapon",
    },
    {
        label: "特效",
        name: "effect",
    },
];
export default {
    "default": {
        tabList: ['background', 'person', 'face', 'weapon', 'effect'],
        columns: {
            'background': createColumns(),
            'person': createColumns(),
            'face': createColumns(),
            'weapon': createColumns(),
            'effect': createColumns(),
        },
        searchConfig: {
            'background': createSearchConfig(),
            'person': createSearchConfig(),
            'face': createSearchConfig(),
            'weapon': createSearchConfig(),
            'effect': createSearchConfig(),
        }
    }
}