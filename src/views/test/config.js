import { useDict } from '@/utils/dict'

const {
    case_type,
} = useDict(
    "case_type",
)

export const searchConfig = ref([
      {
        type: "input",
        prop: "type",
        label: "审核类型（1-政策解读文件共享； 2-业务学习平台； 3-建筑废弃物案例展示 ）",
        show: "false",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "select",
        prop: "status",
        label: "审查状态",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: [],
        props: {
          label: 'dictLabel',
          value: 'dictValue'
        }
      },
      {
        type: "select",
        prop: "caseType",
        label: "案例类型",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: case_type,
        props: {
          label: 'dictLabel',
          value: 'dictValue'
        }
      },
      {
        type: "input",
        prop: "title",
        label: "案例标题",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "input",
        prop: "auditUnit",
        label: "审查单位",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "datetimerange",
        prop: "auditTime",
        label: "审查时间",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: [],
        defaultTime: [
          new Date(2000, 1, 1, 0, 0, 0),
          new Date(2000, 2, 1, 23, 59, 59),
        ],
      },
          {
        type: "datetimerange",
        prop: "uploadTime",
        label: "上传时间",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: [],
        defaultTime: [
          new Date(2000, 1, 1, 0, 0, 0),
          new Date(2000, 2, 1, 23, 59, 59),
        ],
      },
          {
        type: "input",
        prop: "uploadPerson",
        label: "上传人员",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
  { type: "reset", text: "重置" },
  { type: "submit", text: "查询" },
]);
export const columns = [
      { type: "index", label: "序号", width: 80, align: "center" },
      { prop: "status", label: "审查状态", align: "center" },
          { prop: "caseType", label: "案例类型", align: "center" },
          { prop: "title", label: "案例标题", align: "center" },
          { prop: "auditUnit", label: "审查单位", align: "center" },
          { prop: "auditTime", label: "审查时间", align: "center" },
          { prop: "uploadTime", label: "上传时间", align: "center" },
          { prop: "uploadPerson", label: "上传人员", align: "center" },
          { prop: "caseDes", label: "案例描述", align: "center" },
          { prop: "operation",label: "操作",fixed: "right", width: 220, slot: "action", align: "center"},
];

export const transformData = (data) => {
  return data;
};
