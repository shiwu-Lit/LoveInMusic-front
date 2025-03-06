import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const username = ref(null)
    const token = ref(null)
    const role = ref([])
    return {username, token, role}
}, {
    persist: {
        storage: sessionStorage
    }
})