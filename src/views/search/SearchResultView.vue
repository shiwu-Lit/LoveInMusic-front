<script setup>
import SearchDataRender from "@/components/search/SearchDataRender.vue";
import { usePaginationStorage } from "@/stores/pagination.js";
import { storeToRefs } from "pinia";
import SearchNoData from "@/components/search/SearchNoData.vue";
import { onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { getScoreListBySearchApi } from "@/apis/scores.js";

const paginationStorage = usePaginationStorage();
const { total, keyword, page, size, dataList } = storeToRefs(paginationStorage);
const { setPage } = paginationStorage;
const route = useRoute();

// 手动触发搜索
const triggerSearch = () => {
  const routeKeywords = route.query.keywords || "";
  if (!routeKeywords || routeKeywords.trim() === "") {
    console.warn("Keyword from route is empty, skipping search");
    dataList.value = [];
    total.value = 0;
    return;
  }
  keyword.value = routeKeywords; // 确保 Pinia 状态更新
  console.log("Triggering search with keyword:", keyword.value);
  page.value = 1;
};

watchEffect(() => {
  console.log("Current route query:", route.query);
  console.log("Searching with keyword:", keyword.value, "page:", page.value, "size:", size.value);
  if (page.value < 1) {
    setPage(1);
  }
  if (!keyword.value || keyword.value.trim() === "") {
    console.warn("Keyword is empty, skipping search");
    dataList.value = [];
    total.value = 0;
    return;
  }

  getScoreListBySearchApi(keyword.value, page.value, size.value)
      .then(resp => resp.data)
      .then(data => {
        console.log("Received data:", data);
        dataList.value = data.scoreEsList || [];
        total.value = data.totalScore || 0;
        console.log("Updated dataList:", dataList.value);
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

// 初次加载和路由变化时触发搜索
onMounted(() => {
  console.log("Component mounted, triggering initial search");
  triggerSearch();
});

// 监听路由变化，动态更新 keyword
watchEffect(() => {
  const newKeywords = route.query.keywords || "";
  if (newKeywords !== keyword.value && newKeywords.trim() !== "") {
    console.log("Route changed, updating keyword to:", newKeywords);
    keyword.value = newKeywords;
    triggerSearch();
  }
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