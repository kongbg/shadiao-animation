import { useDict } from '@/utils/dict'
import {
} from "@/api/customized/case/index.js"; // 接口


export const {
} = useDict(
)

export const searchConfig = ref([
      {
        type: "input",
        prop: "createBy",
        label: "创建人",
        show: "false",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "input",
        prop: "createTime",
        label: "创建时间",
        show: "false",
        placeholder: "请输入",
        clearable: true
      },
      {
        type: "input",
        prop: "updateBy",
        label: "更新人",
        show: "false",
        placeholder: "请输入",
        clearable: true
      },
  { type: "reset", text: "重置" },
  { type: "submit", text: "查询" },
]);
export const columns = [
      { type: "index", label: "序号", width: 80, align: "center" },
      { prop: "createBy", label: "创建人", align: "center" },
          { prop: "createTime", label: "创建时间", align: "center" },
          { prop: "updateBy", label: "更新人", align: "center" },
          { prop: "id", label: "主键id", align: "center" },
          { prop: "operation",label: "操作",fixed: "right", width: 220, slot: "action", align: "center"},
];

export const transformData = (data) => {
  return data;
};
