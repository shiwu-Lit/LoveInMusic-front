import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // 根据实际后端地址调整
    timeout: 5000
});

// 模拟本地数据（用于后端不可用时）
const mockPosts = [
    { id: 1, title: "示例帖子 1", content: "这是一个测试帖子内容。" },
    { id: 2, title: "示例帖子 2", content: "这是另一个测试帖子内容。" }
];

// 获取所有帖子（支持分页）
export function getForumPosts(params = { page: 1, size: 10 }) {
    return axiosInstance.get("/anyone/forum/post", { params })
        .catch(error => {
            console.error('获取帖子失败（后端不可用，使用模拟数据）:', error);
            return Promise.resolve({
                data: {
                    code: 200,
                    state: true,
                    data: {
                        posts: mockPosts,
                        totalPages: 1,
                        total: mockPosts.length,
                        currentPage: params.page,
                        pageSize: params.size
                    }
                }
            });
        });
}

// 根据帖子 ID 获取帖子详情
export function getPostById(id) {
    return axiosInstance.get(`/anyone/forum/post/${id}`)
        .catch(error => {
            console.error('获取帖子详情失败（后端不可用，使用模拟数据）:', error);
            const post = mockPosts.find(p => p.id === Number(id));
            return Promise.resolve({
                data: {
                    code: 200,
                    state: true,
                    data: { post: post || { title: "帖子不存在", content: "未找到相关内容" } }
                }
            });
        });
}

// 发布新帖子
export function createPost(data) {
    return axiosInstance.post("/anyone/forum/post", data)
        .catch(error => {
            console.error('发布帖子失败（后端不可用）:', error);
            return Promise.resolve({
                data: {
                    code: 500,
                    state: false,
                    msg: "后端不可用，模拟发布失败"
                }
            });
        });
}

// 获取某个帖子的评论列表
export function getCommentsByPostId(postId) {
    return axiosInstance.get(`/anyone/forum/post/${postId}/comments`)
        .catch(error => {
            console.error('获取评论失败（后端不可用，使用模拟数据）:', error);
            return Promise.resolve({
                data: {
                    code: 200,
                    state: true,
                    data: { comments: [{ id: 1, content: "模拟评论" }] }
                }
            });
        });
}

// 发布评论
export function addComment(data) {
    return axiosInstance.post("/anyone/forum/comment", data)
        .catch(error => {
            console.error('发布评论失败（后端不可用）:', error);
            return Promise.resolve({
                data: {
                    code: 500,
                    state: false,
                    msg: "后端不可用，模拟发布失败"
                }
            });
        });
}