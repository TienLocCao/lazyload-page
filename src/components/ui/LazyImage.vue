<template>
  <div class="lazy-image" :style="{ aspectRatio: '3/2' }">
    <div class="placeholder-shimmer" v-show="!isLoaded"></div>
    <img
      :data-src="src"
      :src="defaultImage"
      :alt="alt"
      ref="imageElement"
      :class="{ loaded: isLoaded }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useIntersectionObserver, useImageLoader } from '@/composables/useImage';

interface Props {
  src: string;
  alt?: string;
}

withDefaults(defineProps<Props>(), {
  alt: ''
});

// Default image or error image path
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjxyZWN0IHg9IjE0MCIgeT0iODAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2RkZCIvPjxyZWN0IHg9IjEzMCIgeT0iOTAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==';

const { isLoaded, imageElement, handleImageLoad } = useImageLoader(defaultImage);

onMounted(() => {
  const { unobserve } = useIntersectionObserver(imageElement, (entry) => {
    if (entry.target instanceof HTMLImageElement) {
      const dataSrc = entry.target.dataset.src;
      if (dataSrc) {
        handleImageLoad(dataSrc);
        unobserve();
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.lazy-image {
  background: #f0f0f0;
  overflow: hidden;
  position: relative;
  
  .placeholder-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #f8f8f8 50%,
      #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
    opacity: 0;
    position: relative;
    z-index: 1;

    &.loaded {
      opacity: 1;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
