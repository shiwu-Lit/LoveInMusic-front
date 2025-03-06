<template>
  <div class="container mt-5">
    <div v-if="post">
      <h1 class="mb-3">{{ post.title }}</h1>
      <h6 class="text-muted mb-4">作者：{{ post.author }} | 发布时间：{{ post.date }}</h6>
      <p>{{ post.content }}</p>
    </div>
    <div v-else>
      <p>正在加载帖子内容...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumDetailView',
  data() {
    return {
      post: null
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.id;
      this.$axios.get(`/api/forums/${postId}`)
          .then(response => {
            this.post = response.data;
          })
          .catch(error => {
            console.error('加载帖子详情失败：', error);
          });
    }
  }
};
</script>
