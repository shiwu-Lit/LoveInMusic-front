<template>
  <div class="hot-scores-carousel">
    <h3 class="carousel-title">看看今日热门吧！</h3>
    <div v-if="hotScores.length > 0" class="carousel-container">
      <div class="cards-wrapper" ref="cardsWrapperRef">
        <div
            v-for="(score, index) in hotScores"
            :key="score.id"
            class="card hot-score-card"
            :class="{ 'active': isMiddleCard(index) }"
        >
          <RouterLink :to="'/details/' + score.id" class="text-decoration-none position-relative">
            <div class="card-img-wrapper">
              <img :src="score.coverImageUrl || 'https://via.placeholder.com/250x180'" class="card-img-top" alt="Cover">
              <div class="card-text-overlay">
                <h5 class="card-title-overlay truncate">{{ score.title }}</h5>
                <p class="card-artist-overlay truncate">{{ score.artist }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="carousel-controls" ref="controlsRef">
        <button @click="moveRight" class="carousel-control-prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button @click="moveLeft" class="carousel-control-next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-muted">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { getHotScoreListApi } from '@/apis/scores.js';

const hotScores = ref([]);
const activeIndex = ref(0);
const controlsRef = ref(null);
const cardsWrapperRef = ref(null);

const totalCards = computed(() => hotScores.value.length);

const isMiddleCard = (index) => {
  return index === activeIndex.value;
};

const moveLeft = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    scrollToMiddle();
  }
};

const moveRight = () => {
  if (activeIndex.value < totalCards.value - 1) {
    activeIndex.value++;
    scrollToMiddle();
  }
};

const scrollToMiddle = () => {
  const cardsWrapper = cardsWrapperRef.value;
  const cardWidth = 250 + 20;
  const scrollPosition = activeIndex.value * cardWidth - (window.innerWidth / 2) + (cardWidth / 2);
  cardsWrapper.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
};

onMounted(async () => {
  try {
    const response = await getHotScoreListApi('hot');
    console.log('Hot scores response:', response);
    hotScores.value = (response.data.score || []).slice(0, 10);
    console.log('Loaded hot scores:', hotScores.value);
    await nextTick();
    if (hotScores.value.length > 0) {
      activeIndex.value = Math.floor(totalCards.value / 2);
      scrollToMiddle();
      console.log('Controls DOM:', controlsRef.value);
    }
  } catch (err) {
    console.error('获取热门曲谱失败:', err);
    hotScores.value = [];
  }
});
</script>

<style scoped>
.hot-scores-carousel {
  padding: 80px 0 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  position: relative;
}

.carousel-title {
  margin: 20px;
  padding: 0 20px 20px;
  font-size: 28px; /* 增大字体，突出标题 */
  font-weight: 700; /* 加粗 */
  color: #dc3545; /* 使用与 CategoryGroup 一致的红色 */
  text-align: center;
  text-transform: uppercase; /* 全部大写，增加视觉冲击 */
  letter-spacing: 2px; /* 增加字间距 */
  background: linear-gradient(90deg, #fff 0%, #f8f9fa 100%); /* 渐变背景 */
  border-bottom: 2px solid #dc3545; /* 下划线，与主题颜色匹配 */
}

.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  position: relative;
}

.cards-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 35px;
  gap: 20px;
  width: 100%;
  justify-content: flex-start;
}

.cards-wrapper::-webkit-scrollbar {
  display: none;
}

.hot-score-card {
  width: 250px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
  flex-shrink: 0;
}

.hot-score-card.active {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.hot-score-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card-img-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card-title-overlay {
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  z-index: 10;
  margin-bottom: 5px;
}

.card-artist-overlay {
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  z-index: 10;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.carousel-controls {
  display: flex;
  flex-direction: row !important;
  direction: ltr !important;
  gap: 40px;
  justify-content: center;
  margin-top: 10px;
  z-index: 20;
  position: relative;
}

.carousel-control-prev,
.carousel-control-next {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #333;
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  border-color: #666;
  transform: scale(1.1);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.carousel-control-prev-icon::before {
  content: '→';
  font-size: 18px;
}

.carousel-control-next-icon::before {
  content: '←';
  font-size: 18px;
}
</style>