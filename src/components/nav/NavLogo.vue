<script setup>
defineProps({
  logoText: { type: String, default: "" } // 允许传入 Logo 文字，可选
});
</script>

<template>
  <a href="#" class="navbar-brand d-flex align-items-center">
    <img src="@/assets/imgs/logo.png" alt="Logo" class="logo-img" />
    <span v-if="logoText" class="logo-text ms-2">{{ logoText }}</span>
  </a>
</template>

<style scoped>
/* Logo 图片 */
.logo-img {
  height: 40px; /* 适当调整大小 */
  width: auto;
  object-fit: contain;
}

/* Logo 文字 */
.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #d9534f; /* 与 text-danger 颜色接近 */
}
</style>
