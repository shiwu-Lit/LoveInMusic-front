<!-- src/components/forum/SortDropdown.vue -->
<template>
  <select v-model="selectedSort" @change="updateSort" class="form-select">
    <option value="createdAt_desc">按发布时间排序 (降序)</option>
    <option value="createdAt_asc">按发布时间排序 (升序)</option>
    <option value="title_asc">按标题排序 (升序)</option>
    <option value="title_desc">按标题排序 (降序)</option>
  </select>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedSort = ref('createdAt_desc');

const updateSort = () => {
  router.push({ query: { ...router.currentRoute.value.query, sort: selectedSort.value, page: '1' } });
};
</script>