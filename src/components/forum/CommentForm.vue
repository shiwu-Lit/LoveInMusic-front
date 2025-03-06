<script setup>
import { ref, defineEmits } from "vue";
import { addComment } from "@/apis/forum.js";
import { useRoute } from "vue-router";

const emits = defineEmits(["commentSubmitted"]);

const commentContent = ref("");
const route = useRoute();
const postId = route.params.id;

async function submitComment() {
  if (!commentContent.value.trim()) {
    alert("评论内容不能为空");
    return;
  }
  try {
    const commentData = {
      postId: postId,
      content: commentContent.value,
      author: "当前用户" // 实际中应从登录状态中获取
    };
    await addComment(commentData);
    commentContent.value = "";
    emits("commentSubmitted");
  } catch (error) {
    console.error("发表评论失败", error);
    alert("发表评论失败");
  }
}
</script>

<template>
  <div class="mt-4">
    <h5>发表评论</h5>
    <textarea v-model="commentContent" class="form-control" rows="3" placeholder="请输入评论内容"></textarea>
    <button @click="submitComment" class="btn btn-success mt-2">提交评论</button>
  </div>
</template>

<style scoped>
/* 可根据需要添加样式 */
</style>
