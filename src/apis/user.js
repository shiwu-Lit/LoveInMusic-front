import axiosInstance from "@/utils/axios.js";

//用户注册
export function userRegisterApi(username, phone, password){
    return axiosInstance({
        method: 'post',
        url: 'anyone/user/register',
        data: {
            username: username,
            phone: phone,
            password: password
        }
    })
}


//用户登录
export function userLoginApi(username, password){
    return axiosInstance({
        method: 'post',
        url: 'anyone/user/login',
        data: {
            username: username,
            password: password
        }
    })
}

//用户退出
export function userLogoutApi(){
    return axiosInstance({
        method: 'post',
        url: 'anyone/user/logout'
    })
}