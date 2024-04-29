import { useDict } from '@/utils/dict'
import {
} from "@/api/consultSource/reply/index.js"; // 接口


const {
    consult_source,
    is_reply,
} = useDict(
    "consult_source",
    "is_reply",
)

export const searchConfig = ref([
      {
        type: "select",
        prop: "consultSource",
        label: "咨询来源",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: consult_source,
        api: '',
        props: {
          label: 'dictLabel',
          value: 'dictValue'
        }
      },
      {
        type: "input",
        prop: "consultUser",
        label: "咨询用户",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "input",
        prop: "consultUserTel",
        label: "手机号码",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "input",
        prop: "question",
        label: "咨询意见",
        show: "true",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "select",
        prop: "isReply",
        label: "是否回复",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: is_reply,
        api: '',
        props: {
          label: 'dictLabel',
          value: 'dictValue'
        }
      },
      {
        type: "datetimerange",
        prop: "quesetionTime",
        label: "咨询时间",
        show: "true",
        placeholder: "请选择",
        clearable: true,
        options: [],
        defaultTime: [
          new Date(2000, 1, 1, 0, 0, 0),
          new Date(2000, 2, 1, 23, 59, 59),
        ],
      },
      { type: "reset", text: "重置" },
  { type: "submit", text: "查询" },
]);
export const columns = [
      { type: "index", label: "序号", width: 80, align: "center" },
      { prop: "consultSource", label: "咨询来源", align: "center", dict: consult_source },
      { prop: "consultUser", label: "咨询用户", align: "center" },
          { prop: "consultUserTel", label: "手机号码", align: "center" },
          { prop: "isReply", label: "是否回复", align: "center", dict: is_reply },
      { prop: "quesetionTime", label: "咨询时间", align: "center" },
          { prop: "replyUser", label: "回复用户", align: "center" },
          { prop: "replyUserDep", label: "所属单位", align: "center" },
          { prop: "replyConstent", label: "回复意见", align: "center" },
          { prop: "replyTime", label: "回复提交时间", align: "center" },
          { prop: "operation",label: "操作",fixed: "right", width: 220, slot: "action", align: "center"},
];

export const transformData = (data) => {
  return data;
};
