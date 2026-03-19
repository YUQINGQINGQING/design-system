<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

function onSelect(tabKey) {
  emit('update:modelValue', tabKey);
}
</script>

<template>
  <div class="tabs" role="tablist" aria-label="仓库筛选">
    <button
      v-for="tab in props.tabs"
      :key="tab.key"
      type="button"
      class="tab"
      :class="{ 'tab-active': props.modelValue === tab.key }"
      role="tab"
      :aria-selected="props.modelValue === tab.key"
      @click="onSelect(tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 8px;
}

.tab {
  height: 34px;
  padding: 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #8797AA;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  cursor: pointer;
  transition: color 120ms ease, border-color 120ms ease;
}

.tab:hover {
  color: #016BFF;
}

.tab:active {
  color: #0160E6;
}

.tab-active {
  color: #016BFF;
  border-bottom-color: #016BFF;
}

.tab-active:hover {
  color: #016BFF;
  border-bottom-color: #016BFF;
}

.tab-active:active {
  color: #0160E6;
  border-bottom-color: #0160E6;
}
</style>
