<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePaginationStorage } from '@/stores/pagination';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { getForumPosts } from '@/apis/forum';
import SearchPaginationButtons from '@/components/search/SearchPaginationButtons.vue';
import PostCreateButton from '@/components/forum/PostCreateButton.vue';
import SortDropdown from '@/components/forum/SortDropdown.vue';

const pagination = usePaginationStorage();
const { total, page, size, dataList } = storeToRefs(pagination);
const { setPage } = pagination;
const route = useRoute();
const router = useRouter();
const error = ref('');
const isLoading = ref(false);

// 触发帖子列表加载
const triggerFetchPosts = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  error.value = '';
  const params = { page: page.value, size: size.value, sort: route.query.sort || 'createdAt_desc' };
  console.log('Request params:', params); // 调试请求参数
  getForumPosts(params)
      .then(resp => {
        console.log('Fetched posts data:', resp);
        if (!resp || typeof resp !== 'object') {
          throw new Error('Invalid response format: expected an object');
        }
        dataList.value = resp.posts || [];
        total.value = resp.totalItems || dataList.value.length;
        console.log('Updated total:', total.value, 'size:', size.value, 'pages:', Math.ceil(total.value / size.value));
        const backendPage = resp.currentPage || page.value;
        setPage(backendPage);
      })
      .catch(err => {
        error.value = err.message || '加载帖子列表失败';
        console.error('加载帖子列表失败:', err);
        dataList.value = [];
        total.value = 0;
      })
      .finally(() => {
        isLoading.value = false;
      });
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

// 监听路由变化和分页状态
watch(
    () => [route.query.sort, page.value, size.value],
    () => {
      console.log('Current route query:', route.query, 'page:', page.value, 'size:', size.value);
      if (page.value < 1) {
        setPage(1);
        return;
      }
      triggerFetchPosts();
    },
    { immediate: true }
);

// 手动触发排序更新
const handleSortChange = (newSort) => {
  router.push({ query: { ...route.query, sort: newSort, page: '1' } });
};

onMounted(() => {
  console.log('Component mounted, triggering initial fetch');
  triggerFetchPosts();
});
</script>

<template>
  <div class="forum-list-container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>论坛帖子</h2>
      <div>
<!--        <SortDropdown @sort-change="handleSortChange" class="me-2" />-->
        <PostCreateButton />
      </div>
    </div>
    <div v-if="isLoading" class="text-center">
      <p class="text-muted">正在加载...</p>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div v-else-if="dataList.length === 0" class="text-center">
      <p class="text-muted">暂无帖子</p>
    </div>
    <div v-else>
      <div v-for="forum in dataList" :key="forum.id" class="card mb-4 shadow-sm">
        <RouterLink :to="`/forum/post/${forum.id}`" class="text-decoration-none text-dark">
          <div class="card-body">
            <h5 class="card-title text-danger">{{ forum.title }}</h5>
            <p class="card-text">{{ forum.content }}</p>
            <p class="text-muted small">
              作者：{{ forum.author }} | 发布时间：{{
                forum.createdAt ? new Date(forum.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).replace(/\//g, '/') : '未知'
              }}
            </p>
          </div>
        </RouterLink>
      </div>
      <SearchPaginationButtons />
    </div>
  </div>
</template>

<style scoped>
.forum-list-container {
  padding: 20px;
  background-color: rgb(238, 240, 242);
}

.card {
  border: none;
  border-radius: 0.5rem;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.card-text {
  color: #6c757d;
  line-height: 1.6;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>