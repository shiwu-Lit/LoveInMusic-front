<script setup>

import {useAuthStore} from "@/stores/auth.js";
import {userLogoutApi} from "@/apis/user.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function logout(){
    userLogoutApi()
        .then(rep => {
            if (rep.state){
                authStore.username = ''
                authStore.token = ''
                router.push('/login')
            }
        })
}

</script>

<template>
    <ul class="navbar-nav">
        <li class="nav-item" v-if="!authStore.username">
            <RouterLink to="/login" class="nav-link active">登录</RouterLink>
        </li>
        <li class="nav-item dropdown" v-else>
            <RouterLink to="/" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{{authStore.username}}</RouterLink>
            <ul class="dropdown-menu">
                <li><RouterLink class="dropdown-item" to="/">个人主页</RouterLink></li>
                <li><button class="dropdown-item" @click="logout">退出登录</button></li>
            </ul>
        </li>
    </ul>
</template>

<style scoped>

</style>