<script setup>
</script>

<template>
  <footer class="bg-light text-center text-muted py-3">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="mb-1">
            <a href="#" class="text-muted text-decoration-none me-3">让音乐与你同在</a>
            <a href="mailto:contact@loveinmusic.com" class="text-muted text-decoration-none me-3">contact@loveinmusic.com</a>
            <a href="#" class="text-muted text-decoration-none me-3"></a>
            <a href="#" class="text-muted text-decoration-none">隐私政策</a>
            <a href="#" class="text-muted text-decoration-none">Cookie 设置</a>
          </p>
          <p class="mb-0 small">
            <span>♥</span> 版权所有 © 2024 LoveInMusic
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid #eee;
}

footer a:hover {
  color: #dc3545 !important; /* 鼠标悬停时变为红色，与你的品牌色匹配 */
}

@media (max-width: 576px) {
  footer .row > div {
    padding: 0.5rem;
  }
}
</style>