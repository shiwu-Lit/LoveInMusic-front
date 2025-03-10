<script setup>
import Nav from "@/components/nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { userRegisterApi } from "@/apis/user.js";
import { useRouter } from "vue-router";

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    username: yup.string().trim().required("给自己起个昵称吧"),
    phone: yup.string().trim().required("手机号不能为空").matches(/1[3456789]\d{9}/, "手机号格式不正确"),
    password: yup.string().trim().required("密码不能为空").min(6, "密码过短，必须 6 位以上"),
  }),
});

const username = defineInputBinds("username");
const password = defineInputBinds("password");
const phone = defineInputBinds("phone");

const router = useRouter();

const onSubmit = handleSubmit(function ({ username, phone, password }) {
  userRegisterApi(username, phone, password).then((resp) => {
    if (resp.state) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  });
});
</script>

<template>
  <Nav />
  <!-- 注册主体 -->
  <div class="register-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
      <div class="card-body">
        <h2 class="text-center mb-4 text-primary">用户注册</h2>
        <form @submit="onSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">账号名</label>
            <input
                v-bind="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="请输入账号名"
                :class="{ 'is-invalid': errors.username }"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">手机号</label>
            <input
                v-bind="phone"
                type="tel"
                class="form-control"
                id="phone"
                placeholder="请输入手机号"
                :class="{ 'is-invalid': errors.phone }"
            />
            <div class="invalid-feedback">{{ errors.phone }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input
                v-bind="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="请输入密码"
                :class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>

          <button type="submit" class="btn btn-primary w-100 mb-3">注册</button>
          <p class="text-center text-muted">
            已有账号？
            <RouterLink to="/login" class="text-decoration-none">立即登录</RouterLink>
          </p>
          <hr class="my-3" />
          <p class="text-center text-muted small">
            注册即表示您同意
            <a href="#" class="text-decoration-none">网站条款</a>
          </p>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.register-container {
  background: url("@/assets/lgbg.png") no-repeat center center fixed;
  background-size: cover;
}

.card {
  border: none;
}

.card-body {
  padding: 2rem;
}

.btn-primary {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-primary:hover {
  background-color: #bb2d3b;
  border-color: #bb2d3b;
}

.invalid-feedback {
  font-size: 0.875rem;
}

.text-primary {
  color: #dc3545 !important;
}
</style>