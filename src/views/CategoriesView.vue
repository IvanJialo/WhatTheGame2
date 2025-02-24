<template>
  <div class="bg-white/50 dark:bg-black/70">
    <div 
      v-for="category in dataGame.categories" 
      :key="category.category" 
      class="text-center gap-8 sm:gap-16 m-8 mt-24 sm:m-20"
    >
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:-mb-20">
        {{ category.category }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:m-36 sm:text-center">
        <GameCard 
          v-for="game in category.games" 
          :key="game.name" 
          :game="game"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "../data/firebase";
import { onMounted, reactive, ref } from "vue";
import GameCard from "../components/GameCard.vue";

const dataGame = reactive({
  categories: [],
});

const randomGames = ref([]);
const allGames = ref([]);

const getRandomGames = () => {
  const shuffled = [...allGames.value].sort(() => 0.5 - Math.random());
  randomGames.value = shuffled.slice(0, 5);
};

const loadDataFromFirebase = () => {
  const categoriesRef = dbRef(database, "categories");

  onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      dataGame.categories = Object.values(data).map((category) => {
        const shuffledGames = category.games.sort(() => 0.5 - Math.random());
        return { category: category.category,games: shuffledGames.slice(0, 5) };
      }); getRandomGames();
    } else {
      dataGame.categories = [];
    }
  });
};

onMounted(() => {
  loadDataFromFirebase();
});
</script>

