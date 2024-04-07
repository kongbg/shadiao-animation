<template>
  <div>
    <el-form
      :model="searchForm"
      label-position="left"
      label-width="120"
      inline
      label-suffix=""
    >
      <template v-for="(item, index) in config">
        <el-row v-if="index % 4 == 0" type="flex" justify="space-between">
          <el-col :span="5" v-for="info in getRows(index)">
            <el-form-item :label="info.label">
              <!-- 输入框 -->
              <el-input
                v-if="info.type == 'input'"
                v-model="searchForm[info.prop]"
                :placeholder="info?.placeholder"
                :clearable="info.clearable || false"
              ></el-input>
              <!-- 下拉框 -->
              <el-select
                v-if="info.type == 'select'"
                v-model="searchForm[info.prop]"
                :placeholder="info?.placeholder"
                :clearable="info.clearable || false"
                @change="val => selectChange(val, info)"
              >
                <el-option
                  v-for="op in getOptions(info)"
                  :label="op[(info.props && info.props.label) || 'label']"
                  :value="op[(info.props && info.props.value) || 'value']"
                  :key="op[(info.props && info.props.value) || 'value']"
                >
                </el-option>
              </el-select>
              <!-- 级联区域 -->
              <el-cascader
                v-if="info.type == 'areacascader'"
                v-model="searchForm[info.prop]"
                :clearable="info.clearable || false"
                :options="getOptions(info)"
                :props="{
                  value: 'areaCode',
                  label: 'areaName',
                  children: 'childList',
                  checkStrictly: true,
                }"
              />
              <!-- 日期时间 -->
              <el-date-picker popper-class="sub-app-popper" 
                v-if="info.type == 'datetimerange'"
                v-model="searchForm[info.prop]"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="info.defaultTime"
                :clearable="info.clearable || false"
                
              />
              <!-- 重置-提交按钮 -->
              <div v-if="info.type == 'empty'"></div>
              <div v-if="info.type == 'btns'" class="search-btn">
                <el-button type="default" @click="reset">重置条件</el-button>
                <el-button type="primary" @click="submit">查询</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="config.length % 4 == 0 && index == config.length">
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <div class="search-btn">
              <el-button type="default" @click="reset">重置条件</el-button>
              <el-button type="primary" @click="submit">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { deepClone } from '@/utils'
const { proxy } = getCurrentInstance();

const props = defineProps({
  userType: {
    type: Number,
    default: 0,
  },
  config: {
    type: Object,
    default: () => {},
  },
});
const searchForm = ref({});
function reset() {
  searchForm.value = {};
  proxy.$emit("reset", searchForm.value);
}
function submit() {
  let params = initSearchParams(searchForm.value);
  proxy.$emit("search", params);
}
function initSearchParams(data) {
    let option = deepClone(data);
    props.config.forEach(item => {
      if (item.transformPropData) {
        option[item.prop] = item.transformPropData(option[item.prop]);
      }
    })
    return option;
}

function getOptions(info) {
  return info.options && info.options.length
    ? info.options
    : optionCache.value[`${info.prop}`];
}

// 初始化搜索下拉框数据
initOption();
let optionCache = ref({});
function initOption() {
  props.config.forEach(async (config) => {
    // 配置了联动的，不自动请求数据
    let autoGet = config.like && config.like.parent;
    if (config.api && !autoGet) {
      let list = await config.api();
      optionCache.value[`${config.prop}`] = list;
    }
  });
}

function getRows(index) {
  let rows = [];
  let config = props.config.filter(
    (item) => !["submit", "reset"].includes(item.type)
  );
  if (index % 4 == 0) {
    rows = config.slice(index, index + 4);
  }

  let current = index / 4 + 1; // 当前遍历次数
  let count = Math.ceil(config.length / 4); // 总共需要遍历次数
  if (current == count) {
    let len = 4 - rows.length - 1;
    for (let i = 0; i < len; i++) {
      rows.push({ type: "empty" });
    }
    rows.push({ type: "btns" });
  }
  return rows;
}


// 联动操作
async function selectChange(value, data) {
  let key = data.like && data.like.key;
  if (key) {
    let likeData = props.config.find(item => {
      return item.prop == key;
    });
    if (likeData) {
      delete searchForm.value[key];
      let list = await likeData.api({ data: value });
      optionCache.value[`${key}`] = list;
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
.search-btn {
  width: 100%;
  margin-right: 0;
}
.el-col:last-child{
  text-align: right;
  .el-form-item {
    margin-right: 0;
  }
}
</style>
