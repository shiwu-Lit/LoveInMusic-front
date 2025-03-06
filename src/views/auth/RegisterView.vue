<script setup>

import Nav from "@/components/nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";
import {useForm} from "vee-validate";
import * as yup from "yup";
import {userRegisterApi} from "@/apis/user.js";
import {useRouter} from "vue-router";

const {errors, handleSubmit, defineInputBinds} = useForm({
    validationSchema: yup.object({
        username: yup.string().trim().required('给自己起个昵称吧'),
        phone: yup.string().trim().required('手机号不能为空').matches(/1[3456789]\d{9}/, '手机号格式不正确'),
        password: yup.string().trim().required('密码不能为空').length(6, '密码过短，必须 6 位以上')
    })
})

const username = defineInputBinds('username')
const password = defineInputBinds('password')
const phone = defineInputBinds('phone')

const router = useRouter();

const onSubmit = handleSubmit(function ({username, phone, password}) {

    userRegisterApi(username, phone, password)
        .then(resp => {
            if (resp.state){
                //2s后跳转到登录页
                setTimeout(() => {
                    router.push('/login')
                },2000)
            }
        })
})


</script>

<template>
    <Nav/>

    <!--注册主体-->
    <div class="container col-xl-10 col-xxl-8 px-4 py-5 my-5">

        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">
                <h1 class="display-4 fw-bold lh-1 mb-3 text-danger">Le-Go 夏日狂欢</h1>
                <p class="col-lg-10 fs-3">甄稀乐购超级品牌日</p>
                <p class="col-lg-10 fs-5 text-muted">满 199 减 100</p>
            </div>
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-4 p-md-5 border bg-light" action="" @submit="onSubmit">

                    <div class="form-floating mb-3">
                        <input type="text"
                               class="form-control rounded-0"
                               placeholder="账号名"
                               v-bind="username"
                               name="username">
                        <label>账号名</label>
                        <p class="text-danger fw-lighter">{{ errors.username }}</p>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="number"
                               class="form-control rounded-0"
                               placeholder="手机号"
                               v-bind="phone"
                               name="phone">
                        <label>手机号</label>
                        <p class="text-danger fw-lighter">{{ errors.phone }}</p>
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

                    <button class="w-100 btn btn-lg btn-danger rounded-0 mb-3" type="submit">注册</button>
                    <RouterLink to="/login" class="text-muted text-decoration-none">已有账号？去登录</RouterLink>
                    <hr class="my-3">
                    <small class="text-muted">用户注册行为默认同意 <a href="#" class="text-decoration-none">网站条款</a></small>
                </form>
            </div>
        </div>

    </div>

    <Footer/>
</template>

<style scoped>

</style>