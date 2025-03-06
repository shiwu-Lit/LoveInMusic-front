<template>
  <div class="nav-search position-relative">
    <div class="input-group search-input-group">
      <input
          type="text"
          class="form-control search-input"
          placeholder="请输入搜索内容"
          v-model="keyword"
          autocomplete="off"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
      />
      <!-- 清除按钮，当有内容时显示 -->
      <button v-if="keyword" class="btn btn-outline-secondary clear-btn" type="button" @click="clearSearch">
        X
      </button>
      <!-- 搜索按钮 -->
      <button class="btn btn-outline-secondary search-btn" type="button" @click="submitSearch">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <!-- 搜索历史下拉列表 -->
    <ul v-if="showHistory && searchHistory.length > 0" class="dropdown-menu show search-history-dropdown">
      <li v-for="(item, index) in searchHistory" :key="index">
        <a class="dropdown-item" href="#" @mousedown.prevent="selectHistory(item)">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 搜索关键词
const keyword = ref('')
// 控制下拉列表显示
const showHistory = ref(false)
// 搜索历史记录
const searchHistory = ref([])

const router = useRouter()

// 加载搜索历史记录（从 localStorage 中获取）
onMounted(() => {
  const history = localStorage.getItem('searchHistory')
  if (history) {
    searchHistory.value = JSON.parse(history)
  }
})

// 当输入框获得焦点时显示历史记录
function handleFocus() {
  showHistory.value = true
}

// 当失去焦点时，稍微延迟隐藏下拉（允许点击历史项）
function handleBlur() {
  setTimeout(() => {
    showHistory.value = false
  }, 200)
}

// 输入处理，可添加自动补全逻辑（如果需要）
function handleInput() {
  // 保留原有补全逻辑（例如通过 API 调用搜索建议），这里示例不做处理
}

// 清除输入框内容
function clearSearch() {
  keyword.value = ''
}

// 提交搜索，保存关键词到历史记录，并跳转到搜索结果页
function submitSearch() {
  const trimmed = keyword.value.trim()
  if (!trimmed) return

  // 将关键词保存到搜索历史中（不重复，最多保存10条）
  if (!searchHistory.value.includes(trimmed)) {
    searchHistory.value.unshift(trimmed)
    if (searchHistory.value.length > 10) {
      searchHistory.value = searchHistory.value.slice(0, 10)
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }

  // 跳转到搜索结果页面，传递关键词参数
  router.push({ path: '/search', query: { keyword: trimmed } })
}

// 当点击历史记录时，选择该关键词并提交
function selectHistory(item) {
  keyword.value = item
  submitSearch()
}
</script>

<style scoped>
.nav-search {
  max-width: 400px;
  margin: 0 auto;
}

/* 保持椭圆形外观 */
.search-input-group {
  border-radius: 50px;
  overflow: hidden;
}

/* 输入框样式 */
.search-input {
  border-right: 0;
  border-radius: 50px 0 0 50px;
}

/* 清除按钮样式：无左右边框 */
.clear-btn {
  border-left: 0;
  border-right: 0;
  background: transparent;
}

/* 搜索按钮样式 */
.search-btn {
  border-left: 0;
  border-radius: 0 50px 50px 0;
}

/* 搜索历史下拉菜单样式 */
.search-history-dropdown {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1000;
}
</style>
