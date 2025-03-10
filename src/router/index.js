// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeIndexView from "@/views/home/HomeIndexView.vue";
import SearchResultView from "@/views/search/SearchResultView.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import ScoreDetailsView from "@/views/details/ScoreDetailsView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";
import ForumListView from "@/views/forum/ForumListView.vue";
import ForumDetailView from "@/views/forum/ForumDetailView.vue";
import ForumCreateView from "@/views/forum/ForumCreateView.vue"; // 新增 ForumCreateView
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast.js";
import { useAuthStore } from "@/stores/auth.js";
import ForumView from "@/views/forum/ForumView.vue";
import CategoryPanelView from "@/views/category/CategoryPanelView.vue";

const routes = [
    {
        path: "/",
        component: HomeView,
        children: [
            {
                path: "/",
                component: HomeIndexView,
            },
            {
                path: "search",
                component: SearchResultView,
            },
            {
                path: '/type',
                name: 'type',
                component: CategoryPanelView,
            },
            {
                path: '/type/:title',
                component: CategoryView,
            },
            {
                path: "details/:id",
                component: ScoreDetailsView,
                meta: { auth: true },
            },
            {
                path: '/forum',
                component: ForumView,
                children: [
                    {
                        path: '',
                        name: 'ForumList',
                        component: ForumListView,
                    },
                    {
                        path: 'post/:id',
                        name: 'ForumDetail',
                        component: ForumDetailView,
                    },
                    {
                        path: 'create',
                        name: 'ForumCreate',
                        component: ForumCreateView,
                        meta: { auth: true }, // 可选：要求登录才能发帖
                    },
                ],
            },
        ],
    },
    {
        path: "/register",
        component: RegisterView,
    },
    {
        path: "/login",
        component: LoginView,
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const toastStore = useToastStore();

    const { username } = storeToRefs(authStore);
    const { toastShow, toastBody } = storeToRefs(toastStore);

    if (!to.meta.auth || (to.meta.auth && username.value)) {
        next();
    } else {
        toastShow.value = true;
        toastBody.value = "请先完成登录";
        next('/login'); // 重定向到登录页面
    }
});

export default router;