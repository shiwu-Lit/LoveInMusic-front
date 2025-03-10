<template>
  <div class="home-page">
    <HotScoresCarousel/>
    <AllScoresPanel />
  </div>
</template>

<script setup>
import HotScoresCarousel from '@/components/hot/HotScoresCarousel.vue';
import AllScoresPanel from '@/components/all/AllScoresPanel.vue';
</script>

<style>
.home-page {
  background-color: rgb(238, 240, 242);
}
</style>