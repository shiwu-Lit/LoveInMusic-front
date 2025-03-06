<script setup>
import Toast from "@/components/toast/Toast.vue";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

</script>

<template>
    <router-view v-slot="{ Component}">
        <keep-alive>
            <component :is="Component"/>
        </keep-alive>
    </router-view>

    <!--弹窗-->
    <Toast v-if="toastStore.toastShow"/>
</template>

<style scoped>
</style>
