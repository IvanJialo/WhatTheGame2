<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import dataGame from '@/data/games.json';

const route = useRoute();
const game = ref(null);

const findGame = (gameName) => {
  return dataGame.categories
    .flatMap(category => category.games)
    .find(game => game.name === gameName);
};

game.value = findGame(route.params.id);

watch(
  () => route.params.id,
  (newGameName) => {
    game.value = findGame(newGameName);
  }
);
</script>

<template>
  <div v-if="game" class=" bg-white/50 dark:bg-black/70 backdrop-blur-sm sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-9">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <div class="space-y-8">
          <div class="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
            <img :src="game.cover_image" :alt="game.name" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-4">
            <h3 class="text-xl font-bold text-[#b197ff]">Available on:</h3>
            <div class="grid grid-cols-1 gap-2">
              <a v-for="(price, store) in game.prices" :key="store" :href="''"
                class="flex items-center justify-between p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <span class="font-medium">{{ store }}</span>
                <span class="font-bold">{{ price }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl font-bold text-[#b197ff]">
              {{ game.name }}
            </h1>

            <div class="flex flex-wrap gap-4 text-sm">
              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-calendar text-[#b197ff]"></i>
                <span>{{ game.release_date }}</span>
              </div>

              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-clock text-[#b197ff]"></i>
                <span>{{ game.average_playtime }}</span>
              </div>

              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-star text-[#b197ff]"></i>
                <span>Most Played: {{ game.most_played }}%</span>
              </div>
            </div>
          </div>

          <div class="prose dark:prose-invert max-w-none">
            <p class="text-lg">{{ game.description }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
              <h3 class="text-xl font-bold text-[#b197ff] mb-4">Development</h3>
              <div class="space-y-2">
                <p><strong>Developer:</strong> {{ game.developer }}</p>
                <p><strong>Publisher:</strong> {{ game.publisher }}</p>
              </div>
            </div>

            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
              <h3 class="text-xl font-bold text-[#b197ff] mb-4">Platforms</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="platform in game.platforms" :key="platform"
                  class="px-3 py-1.5 rounded-full bg-[#b197ff]/10 text-sm">
                  {{ platform }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Reviews</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(score, source) in game.reviews" :key="source" class="p-4 rounded-lg bg-[#b197ff]/10">
                <p class="font-bold">{{ source }}</p>
                <p class="text-2xl">{{ score }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-bold text-[#b197ff]">Media</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a v-for="(link, index) in game.tutorial_links" :key="index" :href="link" target="_blank"
                class="flex items-center justify-center p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <i class="pi pi-youtube text-2xl mr-2 text-[#b197ff]"></i>
                <span>Gameplay Tutorial {{ index + 1 }}</span>
              </a>
              <a :href="game.trailer_preview" target="_blank"
                class="flex items-center justify-center p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <i class="pi pi-play text-2xl mr-2 text-[#b197ff]"></i>
                <span>Watch Trailer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
    <p class="text-gray-700">Game not found.</p>
  </div>
</template>
