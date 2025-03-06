<template>
  <div class="home-page">
    <!-- 热门曲谱轮播 -->
    <HotScoresCarousel/>

    <!-- 所有曲谱列表 -->
    <AllScoresPanel />
  </div>
</template>

<script setup>
import HotScoresCarousel from '@/components/hot/HotScoresCarousel.vue';
import AllScoresPanel from '@/components/home/AllScoresPanel.vue';
</script>


<style>

</style>