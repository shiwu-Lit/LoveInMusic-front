<script setup>
import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";
import { RouterLink } from 'vue-router';

// 定义映射规则：英文分类名称 -> 中文名称
const typeNameMap = {
  Guitar: '吉他',
  Drum: '鼓',
  Piano: '钢琴',
  Flute: '长笛'
};

defineProps({
  title: { type: String }, // 接收英文标题（如 "Guitar"）
  scoreList: { type: Array }
});

// 计算属性：将英文标题映射为中文标题
const displayTitle = (title) => {
  return typeNameMap[title] || title; // 如果没有映射，则显示原始标题
};
</script>

<template>
  <!-- 标题栏 -->
  <div class="title-bar border-bottom py-3 mt-5">
    <!-- 使用映射后的中文标题 -->
    <span class="title-text h4 text-danger fw-bold">{{ displayTitle(title) }}</span>
    <!-- 路由跳转到分类详情页面 -->
    <RouterLink :to="'/type/'+ title" >
            <span class="float-end">
                <i class="bi bi-arrow-right-circle"></i>更多
            </span>
    </RouterLink>
  </div>

  <!-- 商品列表 -->
  <ScoreResponsiveRow :score-list="scoreList" />
</template>


<style scoped>
/* 标题栏容器 */
.title-bar {
  background-color: rgb(238, 240, 242);
  border-bottom: 2px solid #dc3545;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-top: 2.5rem;
  transition: background-color 0.3s ease;
}

/* 标题文本 */
.title-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc3545;
  letter-spacing: 0.05rem;
}

/* “更多”链接 */
.more-link {
  text-decoration: none;
  color: #6c757d;
  font-size: 0.9rem;
  transition: color 0.3s ease, transform 0.2s ease;
}

.more-link:hover {
  color: #dc3545;
  transform: translateX(3px);
}

.more-link .bi-arrow-right-circle {
  font-size: 1rem;
  margin-right: 0.25rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-bar {
    padding: 0.5rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .title-text {
    font-size: 1.25rem;
  }

  .more-link {
    font-size: 0.85rem;
  }
}
</style>