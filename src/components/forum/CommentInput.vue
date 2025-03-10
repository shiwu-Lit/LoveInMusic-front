<template>
  <div class="comment-input mt-4">
    <h5>发表评论</h5>
    <form @submit.prevent="submitComment">
      <div class="mb-3">
        <textarea v-model="content" class="form-control" rows="3" placeholder="请输入你的评论" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { addComment } from '@/apis/forum';
import { useRoute } from 'vue-router';

export default {
  name: 'CommentInput',
  setup(props, { emit }) {
    const route = useRoute();
    const content = ref('');

    const submitComment = async () => {
      if (!content.value.trim()) {
        alert('评论内容不能为空');
        return;
      }
      try {
        const commentData = {
          postId: Number(route.params.id),
          parentCommentId: null, // 顶级评论
          content: content.value,
          author: '当前用户' // 实际中从登录状态获取
        };
        await addComment(commentData);
        content.value = '';
        emit('commentSubmitted');
      } catch (err) {
        alert(err.message || '评论发布失败');
      }
    };

    return {
      content,
      submitComment
    };
  }
};
</script>