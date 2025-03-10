// stores/pagination.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePaginationStorage = defineStore('pagination', () => {
    const page = ref(1);
    const keyword = ref('');
    const size = ref(15); // 默认每页 15 条，与你的代码一致
    const total = ref(0);
    const dataList = ref([]);

    const totalPages = computed(() => Math.ceil(total.value / size.value) || 1);

    const setPage = (newPage) => {
        page.value = Math.max(1, Math.min(newPage, totalPages.value));
    };

    return { page, keyword, size, total, dataList, totalPages, setPage };
}, {
    // persist: { storage: sessionStorage } // 临时注释，需根据需求启用
});