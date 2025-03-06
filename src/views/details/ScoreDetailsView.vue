<script setup>
import { useRoute } from "vue-router";
import { getScoreDetailsByIdApi } from "@/apis/scores.js";
import { ref } from "vue";

const route = useRoute();
const score = ref({});

getScoreDetailsByIdApi(route.params.id)
    .then(resp => resp.data)
    .then(data => score.value = data.score)
    .then(() => window.scrollTo({ left: 0, top: 0, behavior: "smooth" }));
</script>

<template>
  <div class="container my-5 py-5">
    <div class="row justify-content-center">
      <!-- 曲谱封面图片 -->
      <div class="col-12 mb-4 overflow-hidden">
        <img :src="score.coverImageUrl" class="img-fluid rounded-3 shadow-lg" alt="曲谱封面">
      </div>

      <!-- 曲谱信息 -->
      <div class="col-12 col-md-8">
        <div class="card border-0 shadow-lg p-4 rounded-3">
          <h1 class="card-title mb-2">{{ score.title }}</h1>
          <p class="card-text mb-1"><strong>歌手：</strong>{{ score.arlist }}</p>
          <p class="card-text mb-1"><strong>类别：</strong>{{ score.type }}</p>
          <p class="card-text mb-1"><strong>专辑：</strong>{{ score.album }}</p>
          <p class="card-text mb-1"><strong>歌曲：</strong>{{ score.song }}</p>
          <p class="card-text mb-3"><strong>价格：</strong><span class="text-danger fs-3">{{ score.price }}</span></p>

          <!-- 按钮区域 -->
          <div class="d-grid gap-2 d-flex">
            <button class="btn btn-outline-danger rounded-0 px-4">收藏</button>
            <button class="btn btn-danger rounded-0 px-4 fw-bold">购买/播放</button>
          </div>

          <!-- 乐谱显示（假设后端提供乐谱图片或数据） -->
          <div class="mt-4">
            <h3>乐谱内容</h3>
            <!-- 假设后端返回乐谱图片 URL（从 imageUrl 提取第一个 URL） -->
            <img v-if="score.imageUrl" :src="score.imageUrl.split(',')[0]" class="img-fluid rounded-3 shadow-sm" alt="乐谱">
            <p v-else class="text-muted">暂无乐谱内容</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义样式 */
.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 16px;
  color: #666;
}

.btn-outline-danger, .btn-danger {
  font-size: 14px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

/* 确保文字和图片间距合理 */
.mb-1 {
  margin-bottom: 0.25rem !important; /* 减少间距 */
}

.mb-2 {
  margin-bottom: 0.5rem !important; /* 适中的标题间距 */
}

.mb-3 {
  margin-bottom: 1rem !important; /* 价格和按钮区域的间距 */
}

.mb-4 {
  margin-bottom: 1.5rem !important; /* 图片和信息之间的间距 */
}
</style>