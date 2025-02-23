<script setup>
import { useRoute } from 'vue-router';
import dataGame from '@/data/games.json';

const route = useRoute();
const gameName = route.params.id;

const game = dataGame.categories
  .flatMap(category => category.games)
  .find(game => game.name === gameName);
</script>

<template>
  <div v-if="game" class="text-center max-w-3xl mx-auto px-4 py-8 pt-40 pb-28 bg-white/60 dark:bg-black/60 backdrop-blur rounded-lg shadow-lg animate-blink">
    <img
      :src="game.cover_image"
      :alt="game.name"
      class="mx-auto h-3.50 rounded-lg mb-4"
    />
    <h1 class="text-2xl font-bold mb-2">{{ game.name }}</h1>
    <p class="text-black dark:text-white mb-4">{{ game.description }}</p>
    <div class="text-sm text-black dark:text-white">
      <p><strong>Developer:</strong> {{ game.developer }}</p>
      <p><strong>Publisher:</strong> {{ game.publisher }}</p>
      <p><strong>Average Playtime:</strong> {{ game.average_playtime }}</p>
      <p><strong>Platforms:</strong> {{ game.platforms.join(', ') }}</p>
      <p><strong>Release Date:</strong> {{ game.release_date }}</p>
    </div>
    <div class="mt-4">
      <a
        v-for="(price, store) in game.prices"
        :key="store"
        :href="''"
        class="inline-block bg-[#b197ff] text-black font-medium px-4 py-2 rounded-lg mr-2 transition hover:bg-[#DCD0FF]"
      >
        {{ store }}: {{ price }}
      </a>
    </div>
  </div>
  <div v-else class="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
    <p class="text-gray-700">Game not found.</p>
  </div>
</template>
