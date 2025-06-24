<template>
  <Header />
  <main>
    <CardList />
  </main>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
import CardList from './components/card/CardList.vue';
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f5f6fa;
}

</style>