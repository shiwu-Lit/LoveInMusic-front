<script setup>

</script>

<template>

    <div class="container mt-5">

        <!--标题-->
        <h3 class="text-center">
            <i class="bi bi-fire text-danger"></i>
            热门商品
        </h3>

        <RouterView/>

    </div>

</template>

<style scoped>
.router-link-active.router-link-exact-active{
    color: red;
}
</style>