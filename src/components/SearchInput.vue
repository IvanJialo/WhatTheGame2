<template>
    <div class="relative w-full max-w-md mx-auto">
        <input v-model="searchQuery" type="text" placeholder="Search for a game..." @input="debouncedSearch"
            class="w-full p-3 border rounded-lg shadow-sm ring-magenta focus:outline-none focus:ring-2 focus:ring-magenta-500 text-black" />

        <!-- Dropdown de sugerencias -->
        <ul v-if="filteredGames.length"
            class="absolute z-50 mt-2 w-full bg-white dark:bg-black rounded-lg shadow-lg max-h-60 overflow-y-auto ">
            <li v-for="game in filteredGames" :key="game.name" @click="selectGame(game)"
                class="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <img :src="game.cover_image" alt="game.name" class="w-10 h-10 rounded-lg" />
                <span>{{ game.name }}</span>
            </li>
        </ul>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { ref as dbRef, onValue } from 'firebase/database';
import { database } from '../data/firebase';
import { useRouter } from 'vue-router';

const searchQuery = ref("");
const allGames = ref([]);
const router = useRouter();

// Cargar juegos desde Firebase
onValue(dbRef(database, "categories"), (snapshot) => {
    const data = snapshot.val();
    allGames.value = data
        ? Object.values(data).flatMap((category) => category.games || [])
        : [];
});

// Filtro de juegos según la búsqueda
const filteredGames = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return query.length >= 3
        ? allGames.value.filter((game) => game.name.toLowerCase().includes(query))
        : [];
});

// Redirigir al seleccionar un juego
const selectGame = (game) => {
    router.push({ name: 'game', params: { id: game.name } });
    searchQuery.value = "";
};

// Debounce para no buscar cada milisegundo
let timeout;
const debouncedSearch = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => { }, 300);
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