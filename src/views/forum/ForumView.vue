<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { createForumPost } from '@/apis/forum';

const router = useRouter();
const route = useRoute();
const navbar = ref(null);
const showPostForm = ref(false);
const newPostTitle = ref('');
const newPostContent = ref('');
const sortOption = ref('createdAt_desc');

// 动态调整 main-content 的 padding-top
onMounted(() => {
  if (navbar.value) {
    const navbarHeight = navbar.value.offsetHeight;
    console.log('Navbar height:', navbarHeight);
    document.querySelector('.main-content').style.paddingTop = `${navbarHeight + 20}px`;
  }
});

const submitPost = async () => {
  if (!newPostTitle.value.trim() || !newPostContent.value.trim()) {
    alert('标题和内容不能为空');
    return;
  }
  try {
    const postData = {
      title: newPostTitle.value,
      content: newPostContent.value,
      author: '当前用户',
    };
    await createForumPost(postData);
    alert('帖子发布成功');
    newPostTitle.value = '';
    newPostContent.value = '';
    showPostForm.value = false;
  } catch (err) {
    alert(err.message || '发布帖子失败');
  }
};

const logout = () => {
  router.push('/login');
};

const handleSortChange = () => {
  router.push({ path: '/forum', query: { sort: sortOption.value } });
};
</script>

<template>
  <div class="forum-container">

    <!-- 内容区域 -->
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.forum-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(238, 240, 242); /* 参考搜索页面样式 */

}

.main-content {
  padding-top: 100px; /* 初始值，动态调整后覆盖 */
  padding-bottom: 20px;
  flex: 1;
  transition: padding-top 0.3s;
}


</style>