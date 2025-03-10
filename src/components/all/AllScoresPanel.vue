<template>
  <div class="all-scores-panel">
    <h3 class="carousel-title">------没有喜欢的？看看这些↓</h3>
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

.carousel-title {
  margin: 20px 0; /* 简化上下间距 */
  padding: 0 20px; /* 左侧留白，与内容对齐 */
  font-size: 24px; /* 字体稍小，更简约 */
  font-weight: 600; /* 中等加粗 */
  text-align: left; /* 左对齐 */
  line-height: 1.5; /* 行高增加可读性 */
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

</style>