import axios from "axios";
import {useToastStore} from "@/stores/toast.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth.js";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
});


//请求拦截器
axiosInstance.interceptors.request.use(config => {

    //从 pinia 获取 token
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        config.headers.Authorization = token
    }

    return config
}, error => Promise.reject(error))


//响应拦截器
axiosInstance.interceptors.response.use(
    res => {
        if (res.data.state){
            return res.data;
        }else {
            const toastStore = useToastStore();
            const {toastShow, toastBody} = storeToRefs(toastStore)
            toastShow.value = true
            toastBody.value = res.data.msg
        }
    },

    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance
