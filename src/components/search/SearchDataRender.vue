<script setup>

import {usePaginationStorage} from "@/stores/pagination.js";
import {storeToRefs} from "pinia";

import ScoreResponsiveRow from "@/components/scores/ScoreResponsiveRow.vue";
import SearchPaginationButtons from "@/components/search/SearchPaginationButtons.vue";

const paginationStorage = usePaginationStorage();
const {dataList} = storeToRefs(paginationStorage)



</script>

<template>
<!--商品列表组件-->
    <ScoreResponsiveRow :score-list="dataList"/>
<!--分页组件-->
    <SearchPaginationButtons/>
</template>

<style scoped>

</style>