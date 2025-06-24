<template>
  <div class="card-list">
    <CardItem
      v-for="(card, i) in visibleCards"
      :key="i"
      :image="card.image"
      :text="card.text"
    />
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CardItem from '@/components/card/CardItem.vue';
import type { CardData } from '@/types';

// Sample texts for variety
const sampleTexts = [
  'Beautiful mountain landscape',
  'Sunset at the beach',
  'Urban architecture',
  'Wildlife photography',
  'Abstract art piece',
  'Colorful flowers in spring',
  'Modern city skyline',
  'Historic landmarks',
  'Natural wonders',
  'Technological innovation'
];

// Generate random text
const getRandomText = () => {
  const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  return Math.random() > 0.5 ? text : text + ' - ' + 'A longer description that will be truncated in the card view to demonstrate the ellipsis feature';
};

// Generate cards with different image sizes and random texts
const generateCards = (count: number): CardData[] => {
  return Array.from({ length: count }, (_, i) => {
    const width = Math.floor(Math.random() * 200) + 300; // Random width between 300-500
    const height = Math.floor(width * 2 / 3); // Maintain 3:2 ratio
    return {
      image: `https://picsum.photos/${width}/${height}?${i}`,
      text: getRandomText()
    };
  });
};

// Generate all possible cards but only show some initially
const allCards = ref(generateCards(100));
const currentPage = ref(1);
const cardsPerPage = 12;
const isLoading = ref(false);

// Compute visible cards based on current page
const visibleCards = computed(() => {
  return allCards.value.slice(0, currentPage.value * cardsPerPage);
});

// Infinite scroll handling
const loadMoreTrigger = ref(null);

const loadMore = async () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (currentPage.value * cardsPerPage < allCards.value.length) {
    currentPage.value++;
  }
  
  isLoading.value = false;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value) {
        loadMore();
      }
    },
    {
      rootMargin: '100px',
      threshold: 0.1
    }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});
</script>

<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr); // Mặc định 1 cột
  gap: 1.5em;
  padding: 2em;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); // Chỉ từ 1200px mới có 4 cột
  }

  .load-more-trigger {
    grid-column: 1 / -1;
    height: 20px;
    margin-top: 20px;
  }
}
</style>