<template>
  <header class="header">
    <div class="logo-title">
      <component :is="HomeIcon" class="w-6 h-6 text-blue-500" />
      <span class="title">My App</span>
    </div>

    <!-- Mobile menu button -->
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <!-- Navigation menu -->
    <nav class="menu" :class="{ 'menu--open': isMenuOpen }">
      <BaseButton variant="primary" size="sm">
        Indie Game
      </BaseButton>
      <BaseButton variant="primary" size="sm">
        Entry Game
      </BaseButton>
      <BaseButton variant="primary" size="sm">
        Community
      </BaseButton>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeIcon from '../../icons/HomeIcon.vue'
import BaseButton from '../ui/BaseButton.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background: #222;
  color: #fff;
  position: sticky;
  z-index: 999;
  top: 0;

  .logo-title {
    display: flex;
    align-items: center;
    .logo {
      width: 2em;
      height: 2em;
      margin-right: 0.5em;
    }
    .title {
      font-size: 1.5em;
      font-weight: bold;
    }
  }

  .menu-toggle {
    display: none; // Hidden by default on desktop
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    .bar {
      width: 100%;
      height: 3px;
      background-color: #fff;
      transition: all 0.3s ease;
    }
  }

  .menu {
    display: flex;
    gap: 1.5em;
  }

  // Mobile styles
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex; // Show on mobile
    }

    .menu {
      position: fixed;
      top: 0;
      right: -100%; // Hide off-screen by default
      width: 70%;
      height: 100vh;
      background: #333;
      flex-direction: column;
      padding: 5em 2em 2em;
      transition: right 0.3s ease;

      &--open {
        right: 0; // Slide in when open
      }
    }
  }
}
</style>