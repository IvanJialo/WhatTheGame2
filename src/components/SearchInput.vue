<template>
  <div class="relative w-full max-w-md mx-auto">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a game..."
      @input="debouncedSearch"
      class="w-full p-3 border rounded-lg shadow-sm ring-magenta focus:outline-none focus:ring-2 focus:ring-magenta-500 text-black"
      style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNiMTk3ZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMyAxMGE3IDcgMCAxIDAgMTQgMGE3IDcgMCAxIDAtMTQgMG0xOCAxMWwtNi02Ii8+PC9zdmc+');
             background-position: left 0.5rem center; background-repeat: no-repeat; padding-left: 2.5rem;" 
    />

    <ul
      v-if="searchResults.length"
      class="absolute z-50 mt-2 w-full bg-white dark:bg-black rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="game in searchResults"
        :key="game.id"
        @click="selectGame(game)"
        class="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
      >
        <img :src="game.background_image" alt="game.name" class="w-10 h-10 object-cover rounded-lg" />
        <span>{{ game.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { searchGames } from '../data/rawg'; // import desde rawg.js

const searchQuery = ref('');
const searchResults = ref([]);
const router = useRouter();

let timeout;
const debouncedSearch = () => {
  clearTimeout(timeout);
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  timeout = setTimeout(async () => {
    try {
      searchResults.value = await searchGames(searchQuery.value);
    } catch (error) {
      console.error('Error al buscar juegos:', error);
    }
  }, 300);
};

const selectGame = (game) => {
  router.push({ name: 'game', params: { id: game.id } }); // Usa el ID del juego
  searchQuery.value = '';
  searchResults.value = [];
};
</script>

<style scoped>
ul::-webkit-scrollbar {
  width: 8px;
}
ul::-webkit-scrollbar-thumb {
  background-color: #b197ff;
  border-radius: 10px;
}
</style>
