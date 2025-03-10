<script setup>
import Nav from "@/components/nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { userLoginApi } from "@/apis/user.js";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    username: yup.string().trim().required("请输入账号"),
    password: yup.string().trim().required("请输入密码"),
  }),
});

const username = defineInputBinds("username");
const password = defineInputBinds("password");

const authStore = useAuthStore();
const router = useRouter();

const onSubmit = handleSubmit(function ({ username, password }) {
  userLoginApi(username, password).then((resp) => {
    authStore.username = resp.data.username;
    authStore.token = resp.data.token;
    authStore.role = resp.data.role;
    setTimeout(() => {
      router.push("/");
    }, 2000);
  });
});
</script>

<template>
  <Nav />
  <!-- 登录主体 -->
  <div class="login-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
      <div class="card-body">
        <h2 class="text-center mb-4 text-primary">用户登录</h2>
        <form @submit="onSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">账号</label>
            <input
                v-bind="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="请输入账号"
                :class="{ 'is-invalid': errors.username }"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
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

          <button type="submit" class="btn btn-primary w-100 mb-3">登录</button>
          <p class="text-center text-muted">
            没有账号？
            <RouterLink to="/register" class="text-decoration-none">立即注册</RouterLink>
          </p>
          <hr class="my-3" />
          <p class="text-center text-muted small">
            登录即表示您同意
            <a href="#" class="text-decoration-none">网站条款</a>
          </p>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.login-container {
  background: url("@/assets/lgbg.png") no-repeat center center fixed;
  background-size: cover;
}

.card {
  border: none;
  border-radius: 10px;
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