<template>
  <div class="comment-section">
    <h2>评论</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <p><strong>{{ comment.user }}</strong>：{{ comment.content }}</p>
      </li>
    </ul>
    <button @click="loadMore">加载更多</button>
  </div>
</template>

<script setup>
defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['loadMore']);

const loadMore = () => {
  emit('loadMore');
};
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
</style>
