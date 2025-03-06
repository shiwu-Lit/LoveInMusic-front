<script setup>

import Footer from "@/components/footer/Footer.vue";
import Nav from "@/components/nav/Nav.vue";
import {useForm} from "vee-validate";
import * as yup from "yup";
import {userLoginApi} from "@/apis/user.js";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const {errors, handleSubmit, defineInputBinds} = useForm({
    validationSchema: yup.object({
        username: yup.string().trim().required('请输入账号'),
        password: yup.string().trim().required('请输入密码')
    })
})

const username = defineInputBinds('username')
const password = defineInputBinds('password')

const authStore = useAuthStore();
const router = useRouter();

const onSubmit = handleSubmit(function ({username, password}) {
	userLoginApi(username, password)
        .then(resp => {
            //将 用户名、token、角色列表存入pinia
            authStore.username = resp.data.username
            authStore.token = resp.data.token
            authStore.role = resp.data.role
            setTimeout(() => {
                router.push('/')
            }, 2000)
        })
})
</script>

<template>
    <Nav/>

    <!--注册主体-->
    <div class="container col-xl-10 col-xxl-8 px-4 py-5 my-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">

            </div>
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-4 p-md-5 border bg-light" action="" @submit="onSubmit">

                    <div class="form-floating mb-3">
                        <input type="text"
                               class="form-control rounded-0"
                               placeholder="账号"
                               v-bind="username"
                               name="username">
                        <label>账号</label>
                        <p class="text-danger fw-lighter">{{ errors.username }}</p>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="password"
                               class="form-control rounded-0"
                               placeholder="密码"
                               v-bind="password"
                               name="password">
                        <label>密码</label>
                        <p class="text-danger fw-light">{{ errors.password }}</p>
                    </div>

                    <button class="w-100 btn btn-lg btn-danger rounded-0 mb-3" type="submit">登录</button>
                    <RouterLink to="/register" class="text-muted text-decoration-none">没有账号？去注册</RouterLink>
                    <hr class="my-3">
                    <small class="text-muted">用户登录行为默认同意 <a href="#" class="text-decoration-none">网站条款</a></small>
                </form>
            </div>
        </div>
    </div>

    <Footer/>
</template>

<style scoped>
</style>