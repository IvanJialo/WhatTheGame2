<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="{ name: 'game', params: { id: game.name } }" class="group relative block h-64 sm:h-80 lg:h-96">
    <span class="absolute inset-0 border-2 border-dashed rounded-lg border-t-[#b197ff] border-r-[#b197ff]/50 border-b-[#b197ff]/40 border-l-[#b197ff]/30"></span>
  
    <div
      class="relative flex h-full transform items-end rounded-lg bg-white/60 dark:bg-black/80 backdrop-blur transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
    >
      <div
        class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-15 sm:p-6 lg:p-8"
      >
        <img :src="game.cover_image" :alt="game.name" class="w-full rounded-lg" />
        <h2 class="mt-4 text-xl font-medium sm:text-2xl">{{ game.name }}</h2>
      </div>
  
      <div
        class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
      >
        <h3 class="mt-4 text-xl font-medium sm:text-2xl">{{ game.name }}</h3>
        <p class="mt-4 text-sm sm:text-base">
          {{ game.description }}
        </p>
        <!-- Mostrar más detalles del juego -->
        <div class="mt-4">
          <p class="text-sm"><strong>Plataformas:</strong> {{ game.platforms.join(", ") }}</p>
          <p class="text-sm"><strong>Lanzamiento:</strong> {{ game.release_date }}</p>
        </div>
        <p class="mt-8 font-bold">View more</p>
      </div>
    </div>
  </RouterLink>
</template>