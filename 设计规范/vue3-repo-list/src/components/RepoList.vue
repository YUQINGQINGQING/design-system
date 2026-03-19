<script setup>
import RepoItem from './RepoItem.vue';

defineProps({
  items: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['action']);

function onItemAction(payload) {
  emit('action', payload);
}
</script>

<template>
  <section class="repo-list" aria-label="仓库列表">
    <RepoItem
      v-for="item in items"
      :key="item.id"
      :repo="item"
      @action="onItemAction"
    />
  </section>
</template>

<style scoped>
.repo-list {
  border-top: 1px solid #E0E6EC;
}
</style>
