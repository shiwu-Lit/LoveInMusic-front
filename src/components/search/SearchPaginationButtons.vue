<script setup>
import { VueAwesomePaginate } from "vue-awesome-paginate";
import { usePaginationStorage } from "@/stores/pagination.js";
import { storeToRefs } from "pinia";

const paginationStorage = usePaginationStorage();
const { total, size, page } = storeToRefs(paginationStorage);
const { setPage } = paginationStorage; // 直接解构 setPage

function onClickHandle(currentPage) {
  setPage(currentPage); // 使用 setPage 更新 page
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
.pagination-container {
  list-style: none;
  display: flex;
  gap: 8px;
  width: fit-content;
  padding: 0;
  margin: 50px auto;

  .paginate-buttons {
    all: unset;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #dc3545;

    &.active-page,
    &:hover {
      background-color: #dc3545;
      color: #fff;
      cursor: pointer;
    }

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