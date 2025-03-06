<script setup>

import {useToastStore} from "@/stores/toast.js";
import {storeToRefs} from "pinia";

const toastStore = useToastStore();
const {toastShow} = storeToRefs(toastStore)

//弹窗默认显示 3s
setTimeout(() => {
    toastShow.value = false
}, 3000)

</script>

<template>
    <!--弹窗-->
    <div class="toast-container position-fixed bottom-0 end-0 p-3 z-3">
        <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive"
             aria-atomic="true">
            <div class="toast-header">
                <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#dc3545"></rect>
                </svg>
                <strong class="me-auto">系统消息</strong>
                <small>刚刚</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">{{toastStore.toastBody}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>