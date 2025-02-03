<template>
  <div class="bg-black/70">
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
import { onMounted, reactive } from "vue"; // Vue 3 Composition API
import GameCard from "../components/GameCard.vue"; // Componente GameCard

// Estado reactivo para almacenar los datos del juego
const dataGame = reactive({
  categories: [],
});

// Método para cargar datos desde Firebase
const loadDataFromFirebase = () => {
  // Referencia a la ubicación en la base de datos
  const categoriesRef = dbRef(database, "categories");

  // Escucha cambios en la base de datos
  onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val(); // Obtiene los datos

    if (data) {
      dataGame.categories = Object.values(data); // Convertir objeto a array
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
