<script setup>
import { ref, onMounted } from 'vue';
import { getForumPosts } from '@/apis/forum.js';

const forums = ref([]);
const error = ref("");
const isLoading = ref(true);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(1);

const fetchPosts = async (page = 1) => {
  try {
    console.log('尝试获取帖子数据...');
    const resp = await getForumPosts({ page, size: pageSize.value });
    if (resp.data.code === 200 && resp.data.state) {
      forums.value = resp.data.data.posts || [];
      totalPages.value = resp.data.data.totalPages || 1;
      currentPage.value = resp.data.data.currentPage || page;
    } else {
      error.value = resp.data.msg || '加载论坛失败';
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = '后端帖子列表接口未找到（404），已加载模拟数据';
    } else {
      error.value = '网络错误或后端不可用，已加载模拟数据';
    }
    console.error('加载帖子列表失败:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPosts(currentPage.value);
});

// 切换页面
const changePage = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    fetchPosts(newPage);
  }
};
</script>

<template>
  <div class="container mt-6 py-3">
    <div v-if="isLoading" class="alert alert-info" role="alert">加载中...</div>
    <div v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <div v-else-if="forums.length">
      <div v-for="forum in forums" :key="forum.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ forum.title }}</h5>
          <p class="card-text">{{ forum.content }}</p>
        </div>
      </div>
      <!-- 分页导航 -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一页</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一页</a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="alert alert-warning" role="alert">暂无帖子数据。</div>
  </div>
</template>