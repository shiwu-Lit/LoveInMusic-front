<script setup>
import {ref, onMounted} from "vue";
import {getHotScoreListApi} from "@/apis/scores.js";
import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";

const hotScoreList = ref([]);

// 获取热门曲谱数据
const fetchHotScores = () => {
  getHotScoreListApi()
      .then(resp => resp.data)
      .then(data => {
        hotScoreList.value = data.scores;
      })
      .catch(err => {
        console.error("获取热门曲谱失败:", err);
      });
};

// 组件加载时获取数据
onMounted(() => {
  fetchHotScores();
});
</script>

<template>
  <ScoreResponsiveRow :score-list="hotScoreList" />
</template>

<style scoped>
/* 在此处可以添加额外样式 */
</style>
