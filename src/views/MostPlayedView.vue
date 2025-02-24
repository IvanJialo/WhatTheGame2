<script setup>
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "../data/firebase";
import { onMounted, reactive } from "vue";
import GameCard from "../components/GameCard.vue";

const dataGame = reactive({
  categories: [],
});

const loadDataFromFirebase = () => {
  const mostPlayedRef = dbRef(database, "categories");

  onValue(mostPlayedRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      dataGame.categories = Object.values(data).flatMap((category) => category.games)
        .sort((a, b) => new Date(b.most_played) - new Date(a.most_played)).slice(0, 20);
    } else {
      dataGame.categories = [];
    }
  });
};

onMounted(() => {
  loadDataFromFirebase();
});
</script>

<template>
  <div class="bg-white/50 dark:bg-black/70">
    <div class="text-center gap-8 sm:gap-16 m-8 mt-24 sm:m-20">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:-mb-20">Most Played</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:m-36">
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
