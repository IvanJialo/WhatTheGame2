<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GameCard from '@/components/GameCard.vue';
import dataGame from '@/data/games.json';
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-36">
    <!-- Iterar sobre las categorías y luego los juegos -->
    <GameCard
      v-for="(game, index) in dataGame.categories.flatMap(category => category.games)"
      :key="index"
      :game="game"
    />
  </div>
</template>
