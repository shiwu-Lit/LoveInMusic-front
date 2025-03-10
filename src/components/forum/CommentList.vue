<template>
  <div class="comment-list mt-4">
    <h5>评论</h5>
    <div v-for="comment in comments" :key="comment.id" class="comment mb-3 p-3 border rounded">
      <p><strong>{{ comment.author }}</strong> - {{ comment.createdAt ? new Date(comment.createdAt).toLocaleString() : '未知' }}</p>
      <p>{{ comment.content }}</p>
      <!-- 显示回复 -->
      <div v-if="comment.replies && comment.replies.length" class="replies ms-4">
        <div v-for="reply in comment.replies" :key="reply.id" class="reply mb-2 p-2 border rounded">
          <p><strong>{{ reply.author }}</strong> - {{ reply.createdAt ? new Date(reply.createdAt).toLocaleString() : '未知' }}</p>
          <p>{{ reply.content }}</p>
        </div>
        <!-- 回复分页控件 -->
        <div v-if="comment.totalReplies > replyPageSize" class="d-flex justify-content-center mt-2">
          <nav>
            <ul class="pagination pagination-sm">
              <li class="page-item" :class="{ disabled: comment.replyPage === 1 }">
                <button class="page-link" @click="loadReplies(comment, comment.replyPage - 1)">上一页</button>
              </li>
              <li class="page-item" v-for="page in Math.ceil(comment.totalReplies / replyPageSize)" :key="page" :class="{ active: comment.replyPage === page }">
                <button class="page-link" @click="loadReplies(comment, page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: comment.replyPage === Math.ceil(comment.totalReplies / replyPageSize) }">
                <button class="page-link" @click="loadReplies(comment, comment.replyPage + 1)">下一页</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- 加载更多回复 -->
      <button v-if="comment.totalReplies > (comment.replies ? comment.replies.length : 0)" class="btn btn-link btn-sm" @click="loadReplies(comment, 1)">
        加载更多回复 ({{ comment.totalReplies - (comment.replies ? comment.replies.length : 0) }})
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getCommentReplies } from '@/apis/forum';

export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const replyPageSize = ref(10);

    const loadReplies = async (comment, page = 1) => {
      try {
        const result = await getCommentReplies(comment.id, { page, size: replyPageSize.value });
        comment.replies = result.replies;
        comment.totalReplies = result.totalItems;
        comment.replyPage = result.currentPage;
        emit('fetchReplies', comment);
      } catch (err) {
        console.error('加载回复失败:', err.message);
      }
    };

    return {
      replyPageSize,
      loadReplies
    };
  }
};
</script>