<template>
  <div class="comp-position">
    <div class="p-item">
      <div class="label">{{ props.compData.scale.label }}:</div>
      <el-input-number
        v-model="props.compData.scale.value"
        class="mx-4"
        step="0.1"
        :min="0.01"
        :max="10"
        controls-position="right"
      ></el-input-number>
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
