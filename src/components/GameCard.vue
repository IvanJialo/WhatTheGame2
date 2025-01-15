<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    game: {
        type: Object,
        required: true,
    },
});
</script>

<template>
  <!-- Mostrando un ejemplo simple para verificar que los datos se reciben -->
  <div class="p-4 border rounded-lg bg-black/75 backdrop-blur">
    <h2 class="text-xl font-bold">{{ game.name }}</h2>
    <img :src="game.cover_image" :alt="game.name" class="w-32 h-32 rounded-lg shadow-lg" />
    <p class="mt-2 text-gray-600">{{ game.description }}</p>
    <p class="mt-1 text-sm text-gray-500">Average Playtime: {{ game.average_playtime }}</p>
  </div>
</template>
