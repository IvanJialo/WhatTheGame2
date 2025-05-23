<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getGameDetailsById } from '@/data/rawg';

const gameDetails = ref(null);

onMounted(async () => {
  try {
    gameDetails.value = await getGameDetailsById(props.game.id);
  } catch (error) {
    console.error('Error al obtener detalles del juego:', error);
  }
});

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="{ name: 'game', params: { id: game.id } }"
    class="group relative block h-64 sm:h-80 lg:h-96 cursor-crosshair">
    <!-- Versión escritorio 2XL -->
    <div class="hidden 2xl:block group relative overflow-hidden rounded-lg transition-transform hover:scale-105">

      <!-- Imagen del juego -->
      <img :src="game.background_image" :alt="game.name"
        class="w-full h-96 object-cover rounded-lg transition duration-300 ease-in-out" />

      <!-- Nombre abajo visible siempre -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 z-20">
        <h2 class="text-xl font-semibold truncate">{{ game.name }}</h2>
      </div>

      <!-- Info al hacer hover -->
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-30">
        <h2 class="text-white text-2xl font-bold mb-2 line-clamp-2">{{ game.name }}</h2>

        <p class="text-sm text-gray-200 mb-2">
          Released: {{ new Date(game.released).toLocaleDateString() }}
        </p>

        <div class="flex flex-wrap gap-2 mb-2">
          <span v-for="platform in game.platforms" :key="platform.platform.id"
            class="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
            {{ platform.platform.name }}
          </span>
        </div>

        <p v-if="game.metacritic" class="text-sm text-yellow-400">
          Metacritic: {{ game.metacritic }}
        </p>
      </div>
    </div>

    <!-- Versión móvil y tablets -->
    <div
      class="2xl:hidden flex flex-col rounded-xl overflow-hidden bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-md transition-transform hover:scale-[1.015] h-full">
      <!-- Imagen con overlay degradado -->
      <div class="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img :src="game.background_image" :alt="game.name"
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <div class="absolute bottom-0 left-0 right-0 z-20 p-3">
          <h2 class="text-white font-semibold text-lg truncate">{{ game.name }}</h2>
          <p v-if="game.released" class="text-sm text-gray-300">
            {{ new Date(game.released).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <!-- Info adicional -->
      <div class="p-3 pt-2 flex flex-col justify-between flex-1">
        <!-- Plataformas -->
        <div class="flex flex-wrap gap-1 mb-2">
          <span v-for="(platform, index) in game.platforms.slice(0, 3)" :key="platform.platform.id"
            class="px-2 py-0.5 bg-[#b197ff]/20 text-[#b197ff] text-[10px] rounded-full">
            {{ platform.platform.name }}
          </span>
        </div>

        <!-- Metacritic -->
        <p v-if="game.metacritic" class="text-sm text-yellow-400 font-medium">
          Metacritic: {{ game.metacritic }}
        </p>
      </div>
    </div>


  </RouterLink>
</template>
