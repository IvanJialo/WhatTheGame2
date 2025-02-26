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
    <div class="hidden 2xl:inline">
      <span
        class="absolute inset-0 border-2 border-dashed rounded-lg border-t-[#b197ff] border-r-[#b197ff]/50 border-b-[#b197ff]/40 border-l-[#b197ff]/30"></span>

      <div
        class="relative flex h-full transform items-end rounded-lg bg-white/60 dark:bg-black/80 backdrop-blur transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-15 sm:p-6 lg:p-8">
          <img :src="game.cover_image" :alt="game.name" class="w-full aspect-[3/4]  rounded-lg" />
          <h2 class="mt-4 text-xl font-medium sm:text-2xl line-clamp-2">{{ game.name }}</h2>
        </div>

        <div
          class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 class="mt-4 text-xl font-medium sm:text-2xl line-clamp-2">{{ game.name }}</h3>
          <p class="mt-4 text-sm sm:text-base line-clamp-4">
            {{ game.description }}
          </p>
          <div class="mt-4">
            <p class="text-sm"><strong>Plataformas:</strong> {{ game.platforms.join(", ") }}</p>
            <p class="text-sm"><strong>Lanzamiento:</strong> {{ game.release_date }}</p>
          </div>
          <p class="mt-8 font-bold">View more</p>
        </div>
      </div>
    </div>

    <div class="2xl:hidden h-full flex flex-col">
      <div class="relative flex-1 overflow-hidden rounded-lg">
        <img :src="game.cover_image" :alt="game.name"
          class="h-full w-full object-cover transition-transform duration-300" />

        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
          <h2 class="text-white font-medium line-clamp-1 text-lg">{{ game.name }}</h2>
          <p class="text-gray-300 text-sm mt-1 line-clamp-2">
            {{ game.description }}
          </p>
        </div>
      </div>

      <div class="mt-2 px-2 text-center">
        <span class="text-black dark:text-[#b197ff] font-medium block">
          {{ game.release_date }}
        </span>

        <div class="mt-2 flex flex-wrap gap-2 justify-center">
          <span v-for="platform in game.platforms" :key="platform"
            class="px-2 py-1 bg-[#b197ff]/20 text-black dark:text-[#b197ff] text-xs rounded-full">
            {{ platform }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>