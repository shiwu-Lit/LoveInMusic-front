<script setup>
import SearchDataRender from "@/components/search/SearchDataRender.vue";
import { usePaginationStorage } from "@/stores/pagination.js";
import { storeToRefs } from "pinia";
import SearchNoData from "@/components/search/SearchNoData.vue";
import { watchEffect } from "vue";
import { getScoreListBySearchApi } from "@/apis/scores.js";

const paginationStorage = usePaginationStorage();
const { total, keyword, page, size, dataList } = storeToRefs(paginationStorage);
const { setPage } = paginationStorage; // 直接从 store 解构 setPage

// 监听分页和关键词变化
watchEffect(() => {
  // 确保 page 不小于 1
  if (page.value < 1) {
    setPage(1);
  }

  getScoreListBySearchApi(keyword.value, page.value, size.value)
      .then(resp => resp.data)
      .then(data => {
        dataList.value = data.scoreEsList || [];
        total.value = data.totalScore || 0;
        // 同步后端返回的 page，但确保不小于 1
        const backendPage = data.page || page.value;
        setPage(backendPage);
      })
      .catch(err => {
        console.error('搜索曲谱失败:', err);
        dataList.value = [];
        total.value = 0;
      });

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
</script>

<template>
  <div class="container mt-5 py-5">
    <!-- 有商品 -->
    <SearchDataRender v-if="total > 0" />
    <!-- 无商品 -->
    <SearchNoData v-else :keyword="keyword" />
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(238, 240, 242);
}
</style>