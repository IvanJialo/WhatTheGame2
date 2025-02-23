<template>
  <div class="bg-white/50 dark:bg-black/70">
    <!-- Itera sobre las categorías -->
    <div v-for="category in dataGame.categories" :key="category.category" class="text-center gap-16 m-20">
      <h2 class="text-2xl font-bold -mb-20">{{ category.category }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 m-36">
        <!-- Itera sobre los juegos de cada categoría -->
        <GameCard v-for="game in category.games" :key="game.name" :game="game" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue } from "firebase/database"; // Firebase
import { database } from "../data/firebase"; // Configuración de Firebase
import { onMounted, reactive, ref } from "vue"; // Vue 3 Composition API
import GameCard from "../components/GameCard.vue"; // Componente GameCard

// Estado reactivo para almacenar los datos del juego
const dataGame = reactive({
  categories: [],
});
const randomGames = ref([]);
const allGames = ref([]);

const getRandomGames = () => {
  const shuffled = [...allGames.value].sort(() => 0.5 - Math.random());
  randomGames.value = shuffled.slice(0, 5);
};
// Método para cargar datos desde Firebase
const loadDataFromFirebase = () => {
  const categoriesRef = dbRef(database, "categories");

  onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      dataGame.categories = Object.values(data).map((category) => {
        const shuffledGames = category.games.sort(() => 0.5 - Math.random());
        return {
          category: category.category,
          games: shuffledGames.slice(0, 5), // Tomar 5 juegos aleatorios
        };
      }); getRandomGames();
    } else {
      dataGame.categories = [];
    }
  });
};

// Carga los datos al montar el componente
onMounted(() => {
  loadDataFromFirebase();
});
</script>

