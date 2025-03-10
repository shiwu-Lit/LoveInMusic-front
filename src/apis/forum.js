// src/apis/forum.js
import axios from 'axios';

// 配置 axios 基础路径
axios.defaults.baseURL = 'http://localhost:8080'; // 替换为实际后端地址

// 获取帖子详情
export const getPostDetail = async (postId) => {
    try {
        const response = await axios.get(`/anyone/forum/post/${postId}`);
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            return response.data.data.post;
        } else {
            throw new Error(response.data.msg || '加载帖子详情失败');
        }
    } catch (error) {
        console.error('加载帖子详情失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 获取帖子的评论（支持分页）
export const getPostComments = async (postId, { page = 1, size = 10 } = {}) => {
    try {
        const response = await axios.get(`/anyone/forum/post/${postId}/comments`, {
            params: { page, size }
        });
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            return {
                comments: response.data.data.comments || [],
                totalItems: response.data.data.totalItems || 0,
                currentPage: response.data.data.currentPage || page,
                pageSize: response.data.data.pageSize || size
            };
        } else {
            throw new Error(response.data.msg || '加载评论失败');
        }
    } catch (error) {
        console.error('加载评论失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 添加评论
export const addComment = async (commentData) => {
    try {
        const response = await axios.post('/anyone/forum/comment', commentData);
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            return response.data.data.comment;
        } else {
            throw new Error(response.data.msg || '评论发布失败');
        }
    } catch (error) {
        console.error('评论发布失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 获取某条评论的回复（支持分页）
export const getCommentReplies = async (parentCommentId, { page = 1, size = 10 } = {}) => {
    try {
        const response = await axios.get(`/anyone/forum/comment/${parentCommentId}/replies`, {
            params: { page, size }
        });
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            return {
                replies: response.data.data.replies || [],
                totalItems: response.data.data.totalItems || 0,
                currentPage: response.data.data.currentPage || page,
                pageSize: response.data.data.pageSize || size
            };
        } else {
            throw new Error(response.data.msg || '加载回复失败');
        }
    } catch (error) {
        console.error('加载回复失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 其他 API（保持不变）
export const getForumPosts = async ({ page = 1, size = 10 } = {}) => {
    try {
        const response = await axios.get('/anyone/forum/posts', {
            params: { page, size }
        });
        console.log('Get all posts response:', response.data);
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            const result = {
                posts: response.data.data.posts || [],
                totalItems: response.data.data.totalItems || response.data.data.posts.length,
                currentPage: response.data.data.currentPage || page,
                pageSize: response.data.data.pageSize || size
            };
            console.log('Processed posts data:', result);
            return result;
        } else {
            throw new Error(response.data.msg || '获取帖子列表失败');
        }
    } catch (error) {
        console.error('获取帖子列表失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createForumPost = async (postData) => {
    try {
        const response = await axios.post('/anyone/forum/posts', postData);
        console.log('Create post response:', response.data);
        if (response.status === 200 && response.data.code === 200 && response.data.state) {
            return response.data.data.post;
        } else {
            throw new Error(response.data.msg || '帖子发布失败');
        }
    } catch (error) {
        console.error('帖子发布失败:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default {
    getForumPosts,
    createForumPost,
    getPostDetail,
    getPostComments,
    addComment,
    getCommentReplies
};