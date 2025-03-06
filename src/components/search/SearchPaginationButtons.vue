<script setup>

import {VueAwesomePaginate} from "vue-awesome-paginate";
import {usePaginationStorage} from "@/stores/pagination.js";
import {storeToRefs} from "pinia";

const paginationStorage = usePaginationStorage();
const {total, size, page} = storeToRefs(paginationStorage)

function onClickHandle(currentPage){
    page.value = currentPage
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
}
</script>

<template>

    <vue-awesome-paginate
        :total-items="total"
        :items-per-page="size"
        :max-pages-shown="5"
        v-model="page"
        :on-click="onClickHandle"
        prev-button-content="<"
        next-button-content=">"
    />

</template>

<style lang="scss">

//分页容器
.pagination-container {
    list-style: none;
    display: flex;
    gap: 8px;
    width: fit-content;
    padding: 0;
    margin: 50px auto;

    //分页按钮
    .paginate-buttons {
        all: unset;
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        //font-size: 16px;
        color: #dc3545;

        //分页按钮被选中样式
        &.active-page,
        &:hover {
            background-color: #dc3545;
            color: #fff;
            cursor: pointer;
        }

        //头尾按钮
        &.back-button,
        &.next-button {
            background-color: #f6f8fa;

            &:hover {
                background-color: #eee;
            }
        }

    }
}


@media (max-width: 768px) {
    .pagination-container {
        gap: 5px;

        .paginate-buttons {
            width: 30px;
            height: 30px;
            line-height: 30px;
        }

    }
}


</style>