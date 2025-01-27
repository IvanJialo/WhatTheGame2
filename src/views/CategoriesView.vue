<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GameCard from '@/components/GameCard.vue';
import dataGame from '@/data/games.json';
</script>

<template>
  <div v-for="category in dataGame.categories" :key="category.name" class="gap-16 m-20">
    <h2 class="text-2xl font-bold -mb-20">{{ category.category }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 m-36">
      <GameCard v-for="game in category.games" :key="game.name" :game="game" />
    </div>
  </div>
</template>
