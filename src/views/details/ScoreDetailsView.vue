<script setup>
import { useRoute } from "vue-router";
import { getScoreDetailsByIdApi } from "@/apis/scores.js";
import { ref } from "vue";

const route = useRoute();
const score = ref({
  title: "",
  artist: "",
  type: "",
  album: "",
  song: "",
  coverImageUrl: "",
  imageUrl: ""
});

const error = ref(""); // 添加错误信息变量

const fetchScore = async () => {
  try {
    const resp = await getScoreDetailsByIdApi(route.params.id);
    score.value = resp.data.data.score; // 正确路径
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  } catch (err) {
    error.value = "加载曲谱失败，请稍后重试"; // 显示错误信息
    console.error("获取曲谱详情失败:", err);
  }
};
fetchScore();
</script>

<template>
  <div class="container my-5 py-5">
    <!-- 错误提示 -->
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div class="row justify-content-center align-items-start">
      <!-- 曲谱封面图片（左边，占 3 列） -->
      <div class="col-12 col-md-3 mb-4 overflow-hidden">
        <img :src="score.coverImageUrl" class="img-fluid rounded-3 shadow-lg" alt="曲谱封面">
        <h1 class="card-title mb-2">{{ score.title }}</h1>
        <p class="card-text mb-1"><strong>歌手：</strong> {{ score.artist }}</p>
        <p class="card-text mb-1"><strong>类别：</strong> {{ score.type }}</p>
        <p class="card-text mb-1"><strong>专辑：</strong> {{ score.album }}</p>
        <p class="card-text mb-1"><strong>歌曲：</strong> {{ score.song }}</p>
        <!-- 按钮区域（只保留收藏按钮） -->
        <div class="d-grid gap-2 d-flex mt-3">
          <button class="btn btn-outline-danger rounded-0 px-4">收藏</button>
        </div>

      </div>

      <!-- 曲谱信息（右边，占 9 列） -->
      <div class="col-12 col-md-9">
        <div class="card border-0 shadow-lg p-4 rounded-3 h-100">


          <!-- 乐谱显示 -->
          <div class="mt-4">
            <h3>乐谱内容</h3>
            <div v-if="score.imageUrl">
              <img v-for="(url, index) in score.imageUrl.split(',')" :key="index" :src="url.trim()" class="img-fluid rounded-3 shadow-sm mb-3" alt="乐谱">
            </div>
            <p v-else class="text-muted">暂无乐谱内容</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>