<template>
  <div class="score-info">
    <img :src="score.coverUrl" alt="封面" class="cover" />
    <h1>{{ score.title }}</h1>
    <p>作者：{{ score.author }}</p>
    <p>发布时间：{{ new Date(score.publishDate).toLocaleDateString() }}</p>
    <p>{{ score.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.score-info {
  margin-bottom: 20px;
}
</style>
