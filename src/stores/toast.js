import {defineStore} from "pinia";
import {ref} from "vue";

export const useToastStore =  defineStore('toast', () => {
    const toastShow = ref(false)
    const toastBody = ref('')
    return {toastBody, toastShow}
}, {
    persist: {
        storage: localStorage
    }
})