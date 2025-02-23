<script setup>
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "../data/firebase";
import { ref, onMounted } from "vue";
import HeroBanner from "@/components/HeroBanner.vue";
import GameCard from "@/components/GameCard.vue";
import SearchInput from "@/components/SearchInput.vue";

const searchQuery = ref("");
const allGames = ref([]);
const randomGames = ref([]);

// Cargar todos los juegos desde Firebase.
const loadGamesFromFirebase = () => {
  const gamesRef = dbRef(database, "categories");

  onValue(gamesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      allGames.value = Object.values(data).flatMap((category) => category.games || []);
      getRandomGames();
    }
  });
};

// Generar 5 juegos aleatorios.
const getRandomGames = () => {
  const shuffled = [...allGames.value].sort(() => 0.5 - Math.random());
  randomGames.value = shuffled.slice(0, 5);
};

onMounted(() => {
  loadGamesFromFirebase();
});
</script>

<template>
  <main class="bg-white/50 dark:bg-black/70">
    <HeroBanner class="animate-blurred-fade-in"/>
    <SearchInput v-model="searchQuery" class="animate-blurred-fade-in mt-10" />
    <div class="text-center gap-16 m-20 mt-64">
      <h2 class="text-2xl font-bold -mb-20">Here you have some games you may like!</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 m-36">
        <GameCard v-for="game in randomGames" :key="game.name" :game="game" />
      </div>
    </div>
  </main>
</template>