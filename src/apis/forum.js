import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // 根据实际后端地址调整
    timeout: 5000
});

// 获取所有帖子
export function getForumPosts(params) {
    return axiosInstance.get("/forum/post", { params });
}

// 根据帖子 ID 获取帖子详情
export function getPostById(id) {
    return axiosInstance.get(`/forum/post/${id}`);
}

// 发布新帖子
export function createPost(data) {
    return axiosInstance.post("/forum/post", data);
}

// 获取某个帖子的评论列表
export function getCommentsByPostId(postId) {
    return axiosInstance.get(`/forum/post/${postId}/comments`);
}

// 发布评论
export function addComment(data) {
    return axiosInstance.post("/forum/comment", data);
}


