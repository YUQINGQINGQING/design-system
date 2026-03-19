<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <header class="page-header">
    <h1 class="page-title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: 8px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
  font-weight: 700;
  color: #081E40;
}
</style>
