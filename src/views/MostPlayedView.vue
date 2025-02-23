<script setup>
import { ref as dbRef, onValue } from "firebase/database"; // Firebase
import { database } from "../data/firebase"; // Configuración de Firebase
import { onMounted, reactive, computed } from "vue"; // Vue 3 Composition API
import GameCard from "../components/GameCard.vue"; // Componente GameCard

// Estado reactivo para almacenar los datos del juego
const dataGame = reactive({
  categories: [],
});

// Método para cargar datos desde Firebase
const loadDataFromFirebase = () => {
  // Referencia a la ubicación en la base de datos
  const mostPlayedRef = dbRef(database, "categories");

  // Escucha cambios en la base de datos
  onValue(mostPlayedRef, (snapshot) => {
    const data = snapshot.val(); // Obtiene los datos

    if (data) {
      dataGame.categories = Object.values(data).flatMap((category) => category.games)
        .sort((a, b) => new Date(b.most_played) - new Date(a.most_played)).slice(0, 20); // Convertir objeto a array, ordenar por release_date y tomar los primeros 30
    } else {
      dataGame.categories = []; // Si no hay datos, inicializa un array vacío
    }
  });
};

// Carga los datos al montar el componente
onMounted(() => {
  loadDataFromFirebase();
});
</script>
<template>
  <div class="bg-white/50 dark:bg-black/70">
    <!-- Itera sobre las categorías -->
    <div class="text-center gap-16 m-20">
      <h2 class="text-2xl font-bold -mb-20">Most Played</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 m-36">
        <!-- Itera sobre los juegos de cada categoría -->
        <GameCard v-for="game in dataGame.categories" :key="game.name" :game="game" />
      </div>
    </div>
  </div>
</template>