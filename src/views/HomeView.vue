<script setup>
import Nav from "@/components/nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";
</script>

<template>
  <!--导航条-->
  <Nav/>
  <!--二级路由出口-->
  <RouterView/>
  <!--页脚-->
  <Footer/>
</template>

<style scoped>

</style>