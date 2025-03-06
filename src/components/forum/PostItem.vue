<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}
</script>

<template>
  <div class="card mb-3" style="cursor: pointer;">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.content }}</p>
      <small class="text-muted">
        作者：{{ post.author }} &nbsp;
        发布时间：{{ formatDate(post.createdAt) }}
      </small>
    </div>
  </div>
</template>

<style scoped>
/* 适当添加样式 */
</style>
