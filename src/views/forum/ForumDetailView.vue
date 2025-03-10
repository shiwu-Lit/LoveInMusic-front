<!-- src/views/forum/ForumDetailView.vue -->
<template>
  <div class="container my-3 py-3">
    <h2 class="mb-4">帖子详情</h2>
    <!-- 帖子内容（假设从路由或 API 获取） -->
    <div class="alert alert-info mb-4" v-if="post">
      <p><strong>作者：</strong> {{ post.author || '未知' }}</p>
      <p><strong>标题：</strong> {{ post.title }}</p>
      <p><strong>内容：</strong> {{ post.content }}</p>
      <small class="text-muted"><strong>发表时间：</strong> {{ formatDate(post.createdAt) }}</small>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <!-- 评论列表 -->
    <h4>评论 ({{ totalComments }})</h4>
    <div class="card mb-3" v-for="comment in comments" :key="comment.id">
      <div class="card-body">
        <p class="card-text">
          <strong>{{ comment.author || '未知' }}</strong>：{{ comment.content }}
        </p>
        <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
        <!-- 回复按钮 -->
        <button
            class="btn btn-sm btn-outline-primary ms-2"
            @click="replyToComment(comment.id)"
            v-if="authStore.username"
        >
          回复
        </button>
        <!-- 回复输入框 -->
        <div v-if="replyingTo === comment.id" class="mt-2">
          <textarea
              v-model="replyContent"
              class="form-control"
              rows="2"
              placeholder="请输入你的回复"
          ></textarea>
          <button class="btn btn-sm btn-primary mt-2" @click="submitReply(comment.id)">
            提交回复
          </button>
          <button class="btn btn-sm btn-secondary mt-2 ms-2" @click="cancelReply">
            取消
          </button>
        </div>
        <!-- 嵌套回复 -->
        <div class="ms-4 mt-2" v-for="reply in replies[comment.id] || []" :key="reply.id">
          <p class="card-text">
            <strong>{{ reply.author || '未知' }}</strong> 回复 <strong>{{ comment.author || '未知' }}</strong>：{{ reply.content }}
          </p>
          <small class="text-muted">{{ formatDate(reply.createdAt) }}</small>
        </div>
      </div>
    </div>

    <!-- 发表评论 -->
    <h4>发表评论</h4>
    <div v-if="!authStore.username" class="alert alert-warning mb-2">
      请先<a href="/login" class="alert-link">登录</a>以发表评论。
    </div>
    <textarea
        v-model="newComment"
        class="form-control mb-2"
        rows="3"
        placeholder="请输入你的评论"
        :disabled="!authStore.username"
    ></textarea>
    <button
        class="btn btn-primary"
        @click="submitComment"
        :disabled="!authStore.username || !newComment.trim()"
    >
      提交
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { getPostDetail, getPostComments, addComment, getCommentReplies } from '@/apis/forum';

const route = useRoute();
const authStore = useAuthStore();
const post = ref(null);
const comments = ref([]);
const replies = ref({}); // 存储每个评论的回复
const newComment = ref('');
const replyContent = ref('');
const replyingTo = ref(null);
const error = ref('');
const totalComments = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const fetchPostDetail = async () => {
  try {
    const response = await getPostDetail(route.params.id);
    post.value = response;
  } catch (err) {
    error.value = '加载帖子详情失败，请稍后重试';
    console.error('获取帖子详情失败:', err);
  }
};

const fetchComments = async () => {
  try {
    const response = await getPostComments(route.params.id, { page: currentPage.value, size: pageSize.value });
    comments.value = response.comments;
    totalComments.value = response.totalItems;
    // 加载回复
    for (const comment of comments.value) {
      const replyResponse = await getCommentReplies(comment.id, { page: 1, size: 10 });
      replies.value[comment.id] = replyResponse.replies;
    }
  } catch (err) {
    error.value = '加载评论失败，请稍后重试';
    console.error('获取评论失败:', err);
  }
};

const submitComment = async () => {
  if (!authStore.username) {
    error.value = '请先登录';
    return;
  }
  if (!newComment.value.trim()) {
    error.value = '评论内容不能为空';
    return;
  }

  try {
    const commentData = {
      postId: route.params.id,
      parentCommentId: null,
      author: authStore.username,
      content: newComment.value,
      createdAt: new Date().toISOString()
    };
    const response = await addComment(commentData);
    comments.value.unshift(response); // 添加到评论顶部
    totalComments.value += 1;
    newComment.value = '';
    error.value = '';
  } catch (err) {
    error.value = '提交评论失败，请稍后重试';
    console.error('提交评论失败:', err);
  };
};

const replyToComment = (commentId) => {
  if (!authStore.username) {
    error.value = '请先登录';
    return;
  }
  replyingTo.value = commentId;
  replyContent.value = '';
};

const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = '';
};

const submitReply = async (parentCommentId) => {
  if (!authStore.username) {
    error.value = '请先登录';
    return;
  }
  if (!replyContent.value.trim()) {
    error.value = '回复内容不能为空';
    return;
  }

  try {
    const replyData = {
      postId: route.params.id,
      parentCommentId: parentCommentId,
      author: authStore.username,
      content: replyContent.value,
      createdAt: new Date().toISOString()
    };
    const response = await addComment(replyData);
    if (!replies.value[parentCommentId]) replies.value[parentCommentId] = [];
    replies.value[parentCommentId].unshift(response);
    totalComments.value += 1;
    replyContent.value = '';
    replyingTo.value = null;
    error.value = '';
  } catch (err) {
    error.value = '提交回复失败，请稍后重试';
    console.error('提交回复失败:', err);
  };
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString();
};

onMounted(() => {
  fetchPostDetail();
  fetchComments();
});
</script>

<style scoped>
.alert-info {
  background-color: white;
}

.card-body {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

.alert-warning a {
  text-decoration: underline;
}
</style>