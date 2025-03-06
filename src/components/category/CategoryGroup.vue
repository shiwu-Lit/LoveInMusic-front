<script setup>
import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";

defineProps({
    title: {type: String},
    scoreList: {type: Array}
})
</script>

<template>
    <!--商品面板组件-->
    <!--    标题-->
    <div class="border-bottom py-2 mt-5">
        <span class="h4 text-danger">{{ title }}</span>
        <RouterLink :to="'/type/'+ title" >
            <span class="float-end">
                <i class="bi bi-arrow-right-circle"></i>更多
            </span>
        </RouterLink>

    </div>

    <!--    商品列表-->
    <ScoreResponsiveRow :score-list="scoreList"/>
</template>

<style scoped>

</style>