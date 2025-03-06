<script setup>

//从路由中获取参数：商品类型
import {useRoute} from "vue-router";
import {usePaginationStorage} from "@/stores/pagination.js";
import {storeToRefs} from "pinia";
import {getScoreByTypeApi} from "@/apis/scores.js";
import {watchEffect} from "vue";
import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";
import SearchPaginationButtons from "@/components/search/SearchPaginationButtons.vue";

const paginationStorage = usePaginationStorage();
const {page, size, dataList, total} = storeToRefs(paginationStorage)

const route = useRoute();
page.value = 1
//查询后台
function getScoreByType(){
    getScoreByTypeApi(route.params.title, page.value, size.value)
        .then(resp => resp.data)
        .then(data => {
            dataList.value = data
            total.value = data.totalScore
        })
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
}

watchEffect(() => {
    getScoreByType()
})


</script>

<template>

    <div class="container mt-5 py-5">
        <!--面包屑导航-->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><RouterLink to="/">首页</RouterLink></li>
                <li class="breadcrumb-item active">{{dataList.type}}</li>
            </ol>
        </nav>
        <!--类型商品列表-->
        <ScoreResponsiveRow :score-list="dataList.scoreList"/>
        <!--分页按钮-->
        <SearchPaginationButtons/>
    </div>

</template>

<style scoped>

</style>