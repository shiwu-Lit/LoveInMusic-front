<script setup>
// 从路由中获取参数：商品类型
import { useRoute } from "vue-router";
import { usePaginationStorage } from "@/stores/pagination.js";
import { storeToRefs } from "pinia";
import { getScoreByTypeApi } from "@/apis/scores.js";
import { watchEffect } from "vue";
import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";
import SearchPaginationButtons from "@/components/search/SearchPaginationButtons.vue";

const paginationStorage = usePaginationStorage();
const { page, size, dataList, total } = storeToRefs(paginationStorage);

const route = useRoute();
page.value = 1;

// 查询后台
function getScoreByType() {
  getScoreByTypeApi(route.params.title, page.value, size.value)
      .then(resp => resp.data)
      .then(data => {
        dataList.value = data;
        total.value = data.totalScore;
      });
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

watchEffect(() => {
  getScoreByType();
});

// 分类名称映射
const typeNameMap = {
  'guitar': '吉他',
  'drum': '鼓',
  'piano': '钢琴',
  'flute': '长笛'
};

// 将英文标题转换为中文
const displayTitle = (title) => {
  if (!title) return '未知分类'; // 如果 title 为空，返回默认值
  const normalizedTitle = title.toLowerCase(); // 转换为小写以匹配映射表
  return typeNameMap[normalizedTitle] || title; // 如果没有映射，则显示原始标题
};
</script>

<template>
  <div class="container mt-5 py-5">
    <!-- 面包屑导航 -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/type">分类</RouterLink></li>
        <li class="breadcrumb-item active">{{ displayTitle(dataList.value?.type || route.params.title) }}</li>
      </ol>
    </nav>
    <!-- 类型商品列表 -->
    <ScoreResponsiveRow :score-list="dataList.scoreList" />
    <!-- 分页按钮 -->
    <SearchPaginationButtons />
  </div>
</template>

<style scoped>
/* 面包屑导航样式 */
.breadcrumb {
  background-color: #f1f3f5; /* 浅灰色背景，与 CategoryGroup 背景协调 */
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
  border-left: 4px solid #dc3545; /* 左侧红色边框，与主题一致 */
}

.breadcrumb-item a {
  color: #dc3545; /* 链接颜色与主题红色一致 */
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #a71d2a; /* 悬停时加深红色 */
  text-decoration: underline;
}

.breadcrumb-item.active {
  color: #495057; /* 深灰色，突出当前项 */
  font-weight: 500;
}

/* 容器样式 */
.container {
  padding: 20px;
  background-color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px 15px;
    font-size: 12px;
  }
}
</style>