<script setup>
const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['action']);

function onClickAction(action) {
  emit('action', { repo: props.repo, action });
}
</script>

<template>
  <article class="repo-item">
    <div class="repo-left">
      <h2 class="repo-name">{{ repo.name }}</h2>
      <p class="repo-desc">{{ repo.description }}</p>
    </div>

    <div class="repo-center">
      <time class="repo-time">{{ repo.timeText }}</time>
    </div>

    <div class="repo-right">
      <button
        v-for="action in repo.actions"
        :key="action"
        type="button"
        class="action-link"
        @click="onClickAction(action)"
      >
        [{{ action }}]
      </button>
    </div>
  </article>
</template>

<style scoped>
.repo-item {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) 160px auto;
  align-items: center;
  column-gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #E0E6EC;
}

.repo-left {
  min-width: 0;
}

.repo-name {
  margin: 0;
  color: #081E40;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 700;
}

.repo-desc {
  margin: 4px 0 0;
  color: #8797AA;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repo-center {
  text-align: center;
}

.repo-time {
  color: #8797AA;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
}

.repo-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

.action-link {
  padding: 0;
  border: none;
  background: transparent;
  color: #016BFF;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  cursor: pointer;
}

.action-link:hover {
  text-decoration: underline;
}

.action-link:active {
  color: #0160E6;
}

@media (max-width: 900px) {
  .repo-item {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }

  .repo-center {
    text-align: left;
  }

  .repo-right {
    justify-content: flex-start;
  }
}
</style>
