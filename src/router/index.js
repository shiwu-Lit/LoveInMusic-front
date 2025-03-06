import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeIndexView from "@/views/home/HomeIndexView.vue";
import SearchResultView from "@/views/search/SearchResultView.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import ScoreDetailsView from "@/views/details/ScoreDetailsView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";
import Forum from "@/views/forum/Forum.vue";
import ForumDetailView from "@/components/forum/ForumDetailView.vue";



import {storeToRefs} from "pinia";
import {useToastStore} from "@/stores/toast.js";
import {useAuthStore} from "@/stores/auth.js";


let routes;
routes = [
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
                component: SearchResultView
            },
            {
                path: "type/:title",
                component: CategoryView
            },
            {
                path: "details/:id",
                component: ScoreDetailsView,
                meta: {auth: true}
            },
            {
                path: "forum",
                component: Forum,

            },
            {
                path: "forum/post/:id",
                component: ForumDetailView,
                meta: {auth: true}
            }
        ]
    },
    {
        path: "/register",
        component: RegisterView
    },
    {
        path: "/login",
        component: LoginView
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

//路由守卫，未登录时，不允许跳转页面，并弹窗显示
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const toastStore = useToastStore();

    const {username} = storeToRefs(authStore)
    const {toastShow, toastBody} = storeToRefs(toastStore)

    if (!to.meta.auth){
        next()
    }else if (to.meta.auth && username.value){
        next()
    }else {
        toastShow.value = true
        toastBody.value = '请先完成登录'
    }
})

export default router;
