


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 跳转到发帖页面
const goToCreatePost = () => {
  router.push('/forum/create');
};
</script>



<template>
  <button class="btn btn-danger" @click="goToCreatePost">发帖</button>
</template>
<style scoped>
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>