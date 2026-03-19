<script setup>
const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['action']);

function onAction() {
  emit('action', props.repo);
}
</script>

<template>
  <article class="repo-card">
    <div class="repo-main">
      <h2 class="repo-name">{{ props.repo.name }}</h2>
      <p class="repo-desc">{{ props.repo.description }}</p>
    </div>
    <div class="repo-meta">
      <time class="repo-time">{{ props.repo.timeText }}</time>
      <button type="button" class="action-btn" @click="onAction">{{ props.repo.actionLabel }}</button>
    </div>
  </article>
</template>

<style scoped>
.repo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--ds-space-4);
  background: var(--ds-card-bg);
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-card-radius);
  box-shadow: var(--ds-card-shadow);
  padding: var(--ds-card-padding);
}

.repo-main {
  min-width: 0;
}

.repo-name {
  margin: 0;
  font-size: var(--ds-font-size-title-medium);
  line-height: var(--ds-line-height-title-medium);
  font-weight: var(--ds-font-weight-bold);
  color: var(--ds-color-text-primary);
}

.repo-desc {
  margin: var(--ds-space-1) 0 0;
  font-size: var(--ds-font-size-body);
  line-height: var(--ds-line-height-body);
  color: var(--ds-color-assist);
}

.repo-meta {
  display: flex;
  align-items: center;
  gap: var(--ds-space-3);
  flex-shrink: 0;
}

.repo-time {
  font-size: var(--ds-font-size-helper);
  line-height: var(--ds-line-height-helper);
  color: var(--ds-color-assist);
  white-space: nowrap;
}

.action-btn {
  height: var(--ds-input-height);
  padding: 0 var(--ds-space-3);
  border-radius: var(--ds-radius-button);
  border: 1px solid var(--ds-button-secondary-brand-border-normal);
  background: var(--ds-button-secondary-brand-bg-normal);
  color: var(--ds-button-text-brand-normal);
  font-size: var(--ds-font-size-body);
  line-height: var(--ds-line-height-body);
  cursor: var(--ds-cursor-clickable);
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}

.action-btn:hover {
  border-color: var(--ds-button-secondary-brand-border-hover);
  background: var(--ds-button-secondary-brand-bg-hover);
  color: var(--ds-button-text-brand-hover);
}

.action-btn:active {
  border-color: var(--ds-button-secondary-brand-border-click);
  background: var(--ds-button-secondary-brand-bg-click);
  color: var(--ds-button-text-brand-click);
}

@media (max-width: 768px) {
  .repo-card {
    flex-direction: column;
    align-items: stretch;
  }

  .repo-meta {
    justify-content: space-between;
  }
}
</style>
