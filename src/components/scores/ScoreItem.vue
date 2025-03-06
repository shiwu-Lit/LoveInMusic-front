<script setup>
defineProps({
  score: {
    type: Object,
    required: true,
    default: () => ({ id: '', coverImageUrl: '', title: '', album: '', song: '' })
  }
})
</script>

<template>
  <div class="card custom-card rounded-3 shadow-sm">
    <RouterLink :to="'/details/' + score.id" class="text-decoration-none text-dark">
      <!-- 图片部分 -->
      <div class="image-container">
        <img :src="score.coverImageUrl" class="card-img-top">
      </div>

      <!-- 卡片主体内容 -->
      <div class="card-body text-center">
        <p class="title truncate fw-bold">{{ score.title }}</p>
        <p class="author truncate text-muted">专辑: {{ score.album }}</p>
        <p class="author truncate text-muted">歌曲: {{ score.song }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.custom-card {
  border: none;
  background-color: #ffffff;
  transition: transform 0.2s ease-in-out;
  max-width: 250px;
  max-height: 320px;
  width: 100%;
  margin: 0; /* 移除卡片的外部间距，交给父容器控制 */
}

.custom-card:hover {
  transform: translateY(-5px);
}

.image-container {
  width: 100%;
  padding: 0; /* 移除图片的内边距 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

img {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.card-body {
  padding: 10px 0 0 0; /* 只保留顶部与图片的 10px 间距，其他方向无间距 */
  min-height: 150px;
  max-height: 160px;
  overflow: hidden;
}

.truncate {
  height: 60px; /* 调整高度以适应更紧凑的行高 */
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}

.title {
  font-size: 14px;
  margin: 0; /* 移除标题的间距 */
  line-height: 1; /* 最小化行高，确保每行紧贴 */
}

.author {
  font-size: 12px;
  color: gray;
  margin: 0; /* 移除作者信息的间距 */
  line-height: 1; /* 最小化行高，确保每行紧贴 */
}
</style>