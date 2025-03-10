<!-- src/views/forum/ForumCreate.vue -->
<template>
  <div class="forum-create-container">
    <h2 class="mb-4">创建新帖子</h2>
    <div v-if="successMessage" class="alert alert-success text-center" role="alert">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="submitPost" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="title" class="form-label">标题</label>
        <input
            v-model="post.title"
            type="text"
            class="form-control"
            id="title"
            required
            :class="{ 'is-invalid': submitted && !post.title }"
        />
        <div v-if="submitted && !post.title" class="invalid-feedback">
          标题不能为空
        </div>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">内容</label>
        <textarea
            v-model="post.content"
            class="form-control"
            id="content"
            rows="5"
            required
            :class="{ 'is-invalid': submitted && !post.content }"
        ></textarea>
        <div v-if="submitted && !post.content" class="invalid-feedback">
          内容不能为空
        </div>
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">作者</label>
        <input
            v-model="author"
            type="text"
            class="form-control"
            id="author"
            readonly
            :class="{ 'is-invalid': submitted && !author }"
        />
        <div v-if="submitted && !author" class="invalid-feedback">
          作者信息缺失，请先登录
        </div>
      </div>
      <button type="submit" class="btn btn-danger" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else>提交</span>
      </button>
      <RouterLink to="/forum" class="btn btn-secondary ms-2">返回</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { createForumPost } from '@/apis/forum';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const post = ref({
  title: '',
  content: ''
});
const author = computed(() => authStore.username || ''); // 使用 username 作为作者
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const submitted = ref(false);

// 提交帖子
const submitPost = async () => {
  submitted.value = true;
  if (!post.value.title || !post.value.content || !author.value) {
    errorMessage.value = '请填写所有必填字段或检查登录状态';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const postData = {
      ...post.value,
      author: author.value // 传递 username 作为 author
    };
    const response = await createForumPost(postData);
    console.log('Post created:', response);
    successMessage.value = '帖子创建成功！';
    post.value = { title: '', content: '' };
    submitted.value = false;
    setTimeout(() => {
      router.push('/forum');
    }, 1000);
  } catch (err) {
    errorMessage.value = err.message || '创建帖子失败，请稍后重试';
    console.error('Error creating post:', err);
  } finally {
    isLoading.value = false;
  }
};

// 初次加载
onMounted(() => {
  console.log('ForumCreate mounted, current username:', authStore.username);
  if (!authStore.username) {
    errorMessage.value = '请先登录';
    router.push('/login');
  }
});
</script>

<style scoped>
.forum-create-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: 500;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

input[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
</style>