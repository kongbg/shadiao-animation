<template>
  <div>
    <el-table ref="table" v-loading="loading" :data="tableData" empty-text="暂无数据" @selection-change="handleSelection"
      border :height="height">
      <el-table-column type="selection" width="100" v-if="showSelection" align="center" />
      <template v-for="(item, i) in columns">
        <el-table-column :show-overflow-tooltip="!item.hiddenOverTip" :sortable="item.sort" :width="item.width"
          :min-width="item.minWidth" :align="item.align" :fixed="item.fixed" :type="item.type" :prop="item.prop"
          :label="item.label" :class-name="item.class">
          <template v-if="item.headSlot" #header>
            <slot :name="item.headSlot"></slot>
          </template>
          <template v-slot="scope">
            <span v-if="item.type === 'index'"> {{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            <slot v-else-if="item.slot" :row="scope.row" :name="item.slot"></slot>
            <template v-else-if="item.render">
              <component :is="item.render(scope)"></component>
            </template>

            <span v-else-if="item.dict">{{
              formateDict(item.dict, scope.row[item.prop], item.multiple)
            }}</span>
            <span v-else>{{
              scope.row[item.prop] || scope.row[item.prop] === 0
              ? scope.row[item.prop]
              : "-"
            }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div style="height: 15px"></div>
    <el-row justify="end" v-if="showPagination">
      <el-pagination v-show="total > 0" @size-change="sizeChange" @current-change="currentChange"
        current-page.sync="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="+total" background>
      </el-pagination>
    </el-row>
  </div>
</template>
<script setup name="Table">
// import { formateDict } from '@/utils'

const props = defineProps({
  //  表头
  columns: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  //是否多选显示
  showSelection: {
    type: Boolean,
    default: false,
  },
  // 当前页
  currentPage: {
    type: Number,
    default: 0,
  },
  // 展示页数
  pageSize: {
    type: Number,
    default: 0,
  },
  //总页数
  total: {
    type: String,
    default: 0,
  },
  // 改变每页展示页数
  sizeChange: {
    type: Function,
    default: () => { },
  },
  // 改变页码
  currentChange: {
    type: Function,
    default: () => { },
  },
  //多选
  handleSelection: {
    type: Function,
    default: () => { },
  },
  //高度
  height: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
});
const table = ref(null);

watch(
  () => [props.currentPage, props.pageSize],
  (newVal) => {
    nextTick(() => {
      // 获取表格滚动区域元素并滚动到顶部
      table.value.setScrollTop(0);
    });
  }
);

function formateDict(val1, val2, val3) {
  return val2
}
</script>

<style scoped lang="scss"></style>
