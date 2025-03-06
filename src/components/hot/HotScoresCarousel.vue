<script setup>

</script>

<template>

  <div class="container mt-5">

    <!--标题-->
    <h3 class="text-center">
      <i class="bi bi-fire text-danger"></i>
      热门商品
    </h3>

    <!--胶囊导航-->
    <ul class="nav nav-tabs mt-5">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">综合</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/hotView" class="nav-link">浏览量</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/hotDeal" class="nav-link">销量</RouterLink>
      </li>
    </ul>

    <RouterView/>

  </div>

</template>

<style scoped>
.router-link-active.router-link-exact-active{
  color: red;
}
</style>