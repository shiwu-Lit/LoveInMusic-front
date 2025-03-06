<script setup>
import { ref, onMounted } from "vue";
import { getForumPosts } from "@/apis/forum"; // 确保路径正确

const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchPosts = async () => {
  try {
    console.log("尝试获取帖子数据...");
    const response = await getForumPosts({ page: currentPage.value });
    console.log("API 响应数据：", response);
    posts.value = response.data.data;
    totalPages.value = response.data.totalPages || 1;
  } catch (error) {
    console.error("加载帖子列表失败：", error);
  }
};


const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPosts();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPosts();
  }
};

// 页面加载时获取数据
onMounted(fetchPosts);
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">论坛帖子列表</h1>
    <div class="row">
      <div class="col-md-4" v-for="post in posts" :key="post.id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">作者：{{ post.author }}</h6>
            <p class="card-text text-truncate">{{ post.summary }}</p>
            <router-link :to="`/forum/post/${post.id}`" class="btn btn-primary">
              查看详情
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">上一页</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">下一页</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
