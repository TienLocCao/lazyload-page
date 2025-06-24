<template>
  <div class="card">
    <div class="image-wrapper">
      <LazyImage :src="image" :alt="text" />
    </div>
    <div class="text" :title="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/ui/LazyImage.vue';
import type { CardData } from '@/types';

defineProps<{
  image: CardData['image'];
  text: CardData['text'];
}>();
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .image-wrapper {
    width: 100%;
    aspect-ratio: 3 / 2;
    background: #eee;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .text {
    padding: 1em;
    font-size: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>