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
    <div class="text-center gap-16 m-20 mt-24 md:m-36 lg:m-40 xl:m-44 2xl:m-48">
      <h2 class="text-2xl font-bold mb-7 md:mb-7">Most Played</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28 2xl:gap-32">
        <GameCard 
          v-for="game in dataGame.categories" 
          :key="game.name" 
          :game="game"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>
