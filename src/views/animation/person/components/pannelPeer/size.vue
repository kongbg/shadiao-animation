<template>
  <div class="comp-position">
    <div v-if="props.compData.unit" class="p-item">
      <div class="label">{{ props.compData.unit.label }}:</div>
      <el-select v-model="props.compData.unit.value" placeholder="">
        <el-option
          v-for="item in props.compData.unit.option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="p-item">
      <div class="label">{{ props.compData.width.label }}:</div>
      <el-input
        class="mx-4"
        v-if="props.compData.width.value == 'auto'"
        disabled
        placeholder="自适应"
      ></el-input>
      <el-input-number
        v-else
        v-model="props.compData.width.value"
        class="mx-4"
        :min="0"
        :max="9999"
        controls-position="right"
      ></el-input-number>

      <div v-if="props.compData.unit" class="unit">
        {{ props.compData.unit.value }}
      </div>
    </div>
    <div class="p-item">
      <div class="label">{{ props.compData.height.label }}:</div>
      <el-input
        class="mx-4"
        v-if="props.compData.width.value == 'auto'"
        disabled
        placeholder="自适应"
      ></el-input>
      <el-input-number
        v-else
        v-model="props.compData.height.value"
        class="mx-4"
        :min="0"
        :max="9999"
        controls-position="right"
      ></el-input-number>
      <div v-if="props.compData.unit" class="unit">
        {{ props.compData.unit.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  compData: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style lang="scss" scoped>
.comp-position {
  .p-item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    padding-left: 10px;
    .unit {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 6px;
    }

    .label {
      min-width: 32px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
