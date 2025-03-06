<script setup>
import NavList from "@/components/nav/NavList.vue";
import NavSearch from "@/components/nav/NavSearch.vue";
import NavAuth from "@/components/nav/NavAuth.vue";
import NavLogo from "@/components/nav/NavLogo.vue";
</script>

<template>
  <header class="nav navbar navbar-expand-lg py-3 fixed-top">
    <NavLogo class=""/>
    <nav class="container d-flex align-items-center">


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="menu" class="collapse navbar-collapse">
        <NavSearch />
        <NavList />
        <NavAuth />
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 1);
}
</style>
