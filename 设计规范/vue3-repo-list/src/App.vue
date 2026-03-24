<script setup>
import { computed, ref } from 'vue';
import FilterTabs from './components/FilterTabs.vue';
import RepoList from './components/RepoList.vue';
import '../../CSS/design-tokens.css';

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'starred', label: '关注' },
  { key: 'internal-public', label: '内部公开' }
];

const activeTab = ref('all');

// 列表数据集中在此处，便于后续替换为接口数据。
const repoItems = ref([
  {
    id: 1,
    name: 'BKI/repo-portal',
    description: '统一仓库门户，聚合流水线、部署和版本信息。',
    timeText: '1小时前',
    type: 'internal-public',
    starred: true,
    actions: ['进入仓库']
  },
  {
    id: 2,
    name: 'BKI/devops-metrics',
    description: 'DevOps 质量指标看板服务。',
    timeText: '1天前',
    type: 'internal-public',
    starred: false,
    actions: ['查看详情']
  },
  {
    id: 3,
    name: 'BKI/auth-center',
    description: '统一认证中心，支持多租户与权限编排。',
    timeText: '2025-12-15',
    type: 'private',
    starred: true,
    actions: ['申请权限']
  }
]);

const visibleRepos = computed(() => {
  if (activeTab.value === 'all') return repoItems.value;
  if (activeTab.value === 'starred') return repoItems.value.filter((item) => item.starred);
  return repoItems.value.filter((item) => item.type === 'internal-public');
});

function handleRepoAction(payload) {
  window.alert(`操作：${payload.action} - ${payload.repo.name}`);
}
</script>

<template>
  <div class="page">
    <FilterTabs v-model="activeTab" :tabs="tabs" />
    <RepoList :items="visibleRepos" @action="handleRepoAction" />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #FFFFFF;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
