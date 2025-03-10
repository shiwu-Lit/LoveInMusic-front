<template>
  <div class="nav-search position-relative">
    <div class="input-group search-input-group">
      <input
          type="text"
          class="form-control search-input"
          placeholder="请输入搜索内容"
          v-model="keywords"
          autocomplete="off"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
      />
      <!-- 清除按钮，当有内容时显示 -->
      <button v-if="keywords" class="btn btn-outline-secondary clear-btn" type="button" @click="clearSearch">
        X
      </button>
      <!-- 搜索按钮 -->
      <button class="btn btn-outline-secondary search-btn" type="button" @click="submitSearch">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <!-- 搜索建议或历史下拉列表 -->
    <ul v-if="showDropdown" class="dropdown-menu search-history-dropdown">
      <!-- 显示建议列表 -->
      <li v-for="(item, index) in suggestList" :key="'suggest-' + index">
        <a class="dropdown-item" href="#" @mousedown.prevent="selectSuggest(item)">{{ item }}</a>
      </li>
      <!-- 显示历史记录 -->
      <li v-for="(item, index) in searchHistory" :key="'history-' + index" v-if="suggestList.length === 0">
        <a class="dropdown-item" href="#" @mousedown.prevent="selectHistory(item)">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getSuggestListApi } from "@/apis/scores.js"

const keywords = ref('')
const showHistory = ref(false)
const searchHistory = ref([])
const suggestList = ref([])

const router = useRouter()

const showDropdown = computed(() => {
  const hasSuggestions = suggestList.value.length > 0
  const hasHistory = keywords.value.trim() === '' && searchHistory.value.length > 0
  const shouldShow = showHistory.value && (hasSuggestions || hasHistory)
  console.log('showDropdown:', shouldShow, 'showHistory:', showHistory.value, 'hasSuggestions:', hasSuggestions, 'hasHistory:', hasHistory)
  return shouldShow
})

onMounted(() => {
  const history = localStorage.getItem('searchHistory')
  if (history) {
    try {
      searchHistory.value = JSON.parse(history)
      console.log('Loaded searchHistory:', searchHistory.value)
    } catch (e) {
      console.error('解析搜索历史失败:', e)
      searchHistory.value = []
    }
  }
})

function handleFocus() {
  console.log('Input focused, setting showHistory to true')
  showHistory.value = true
}

function handleBlur() {
  console.log('Input blurred, setting showHistory to false')
  setTimeout(() => {
    showHistory.value = false
  }, 200)
}

function handleInput() {
  const trimmed = keywords.value.trim()
  console.log('Input changed, keywords:', trimmed)
  if (trimmed === '') {
    suggestList.value = []
    console.log('Keywords empty, cleared suggestList')
    return
  }
  getSuggestListApi(trimmed).then(resp => {
    console.log('getSuggestListApi response:', resp.data)
    suggestList.value = resp.data.suggestList || []
    console.log('Updated suggestList:', suggestList.value)
  }).catch(err => {
    console.error('获取建议失败:', err)
    suggestList.value = []
  })
}

function clearSearch() {
  keywords.value = ''
  suggestList.value = []
  console.log('Cleared keywords and suggestList')
}

function submitSearch() {
  const trimmed = keywords.value.trim()
  console.log('submitSearch triggered with:', trimmed) // 添加日志调试
  if (!trimmed) {
    console.warn('Keywords is empty, skipping submit')
    return
  }

  if (!searchHistory.value.includes(trimmed)) {
    searchHistory.value.unshift(trimmed)
    if (searchHistory.value.length > 10) {
      searchHistory.value = searchHistory.value.slice(0, 10)
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
    console.log('Updated searchHistory:', searchHistory.value)
  }

  router.push({ path: '/search', query: { keywords: trimmed } })
  console.log('Navigated to /search with query:', { keywords: trimmed })
}

function selectHistory(item) {
  keywords.value = item
  submitSearch()
}

function selectSuggest(item) {
  keywords.value = item
  submitSearch()
}
</script>

<style scoped>
.nav-search {
  max-width: 400px;
  margin: 0 auto;
}

.search-input-group {
  border-radius: 50px;
  overflow: hidden;
}

.search-input {
  border-right: 0;
  border-radius: 50px 0 0 50px;
}

.clear-btn {
  border-left: 0;
  border-right: 0;
  background: transparent;
}

.search-btn {
  border-left: 0;
  border-radius: 0 50px 50px 0;
}

.search-history-dropdown {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  display: block;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>