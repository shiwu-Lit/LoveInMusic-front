<template>
  <div class="all-scores-panel">
    <ScoreResponsiveRow :score-list="allScores" />
    <button class="load-more" @click="loadMore">加载更多</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllScores } from '@/apis/scores.js';
import ScoreResponsiveRow from '@/components/scores/ScoreResponsiveRow.vue';

const allScores = ref([]);
const currentPage = ref(0);
const pageSize = ref(15);

const fetchAllScores = async () => {
  try {
    const response = await getAllScores(currentPage.value, pageSize.value);
    allScores.value.push(...response.data.data);
  } catch (error) {
    console.error('获取所有曲谱失败:', error);
  }
};

const loadMore = () => {
  currentPage.value += 1;
  fetchAllScores();
};

onMounted(() => {
  fetchAllScores();
});
</script>

<style scoped>
.all-scores-panel {
  margin-top: 20px;
}

.load-more {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.load-more:hover {
  background-color: #0056b3;
}
.ScoreResponsiveRow {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* 设置子元素之间的间距 */
}


</style>
