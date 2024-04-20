<template>
  <div class="comp-position">
    <div class="p-item">
      <!-- <div class="label">{{ props.compData.url.name }}:</div> -->
      <el-image
        style="width: 100px; height: 100px"
        :src="props.compData.url.value"
        fit="scale-down"
      />
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
