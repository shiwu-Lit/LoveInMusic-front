<script setup>
import { defineProps } from "vue";

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  }
});

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}
</script>

<template>
  <div>
    <div v-if="comments.length === 0" class="alert alert-secondary">
      暂无评论，赶快抢沙发！
    </div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="card mb-2">
        <div class="card-body">
          <p class="card-text">{{ comment.content }}</p>
          <small class="text-muted">
            评论者：{{ comment.author }} &nbsp;
            评论时间：{{ formatDate(comment.createdAt) }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 根据需要添加样式 */
</style>
