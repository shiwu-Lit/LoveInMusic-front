import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePaginationStorage = defineStore('pagination', () => {
    const page = ref(1); // 初始化为 1
    const keyword = ref('');
    const size = ref(15);
    const total = ref(0);
    const dataList = ref([]);

    // 计算总页数
    const totalPages = computed(() => Math.ceil(total.value / size.value) || 1);

    // 限制 page 不小于 1，且不超过总页数
    const setPage = (newPage) => {
        page.value = Math.max(1, Math.min(newPage, totalPages.value));
    };

    return { page, keyword, size, total, dataList, totalPages, setPage };
}, {
    persist: {
        storage: sessionStorage
    }
});