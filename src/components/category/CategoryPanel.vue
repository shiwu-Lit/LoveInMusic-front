<script setup>

//获取分类商品
import {getTypeScoreApi} from "@/apis/scores.js";
import {ref} from "vue";
import CategoryGroup from "@/components/category/CategoryGroup.vue";

const typeScoreList = ref({})

getTypeScoreApi()
.then(resp => resp.data)
.then(data => typeScoreList.value = data)
</script>

<template>

    <div class="container mt-5 py-5">
        <CategoryGroup v-for="scoreList in getTypeScoreApi.scoreList"
                       :title="scoreList[0].type"
                       :score-list="scoreList"/>
    </div>

</template>

<style scoped>

</style>