<script setup>

import SearchDataRender from "@/components/search/SearchDataRender.vue";
import {usePaginationStorage} from "@/stores/pagination.js";
import {storeToRefs} from "pinia";
import SearchNoData from "@/components/search/SearchNoData.vue";
import {watchEffect} from "vue";
import {getScoreListBySearchApi} from "@/apis/scores.js";

const paginationStorage = usePaginationStorage();
const {total, keyword, page, size, dataList} = storeToRefs(paginationStorage)


watchEffect(() => {
  getScoreListBySearchApi(keyword.value, page.value, size.value)
      .then(resp => resp.data)
      .then(data => {
        dataList. value = data.scoreEsList
        total.value = data.totalScore
      })
  window.scrollTo({top:0, left: 0, behavior: "smooth"})
})
</script>

<template>
  <div class="container mt-5 py-5">
    <!--有商品-->
    <SearchDataRender v-if="total > -1 "/>
    <!--无商品-->
    <SearchNoData v-else :keyword="keyword"/>
  </div>

</template>

<style scoped>

</style>