<template>
  <div class="bg-white/50 dark:bg-black/70">
    <div
      v-for="category in genreGames"
      :key="category.genre"
      class="text-center gap-8 sm:gap-16 m-8 mt-28 sm:m-20"
    >
      <h2 class="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-[#b197ff] dark:text-[#d0bfff]">
        {{ category.category }}
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:ml-36 sm:mr-36">
        <GameCard
          v-for="game in category.games"
          :key="game.id"
          :game="game"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
// import { ref as dbRef, onValue } from "firebase/database";
// import { database } from "../data/firebase";
import { onMounted, ref } from "vue";
import GameCard from "../components/GameCard.vue";
import { getGameGenres, getGamesByGenre } from "@/data/rawg";

const genres = ref([]);
const genreGames = ref([])

onMounted(async () => {
  try {
    const allGenres = await getGameGenres();
    genres.value = allGenres.results;

    const randomGenres = genres.value.sort(() => 0.5 - Math.random()).slice(0, 10);

    const promises = randomGenres.map(async (genre) => {
      const response = await getGamesByGenre(genre.id);
      return {
        category: genre.name, // el nombre del género
        games: response.results.slice(0, 10), // los juegos de ese género
      };
    });

    genreGames.value = await Promise.all(promises);

    console.log(genreGames.value);
  } catch (error) {
    console.error('Error al obtener juegos por género:', error);
  }
});


// const dataGame = reactive({
//   categories: [],
// });

// const randomGames = ref([]);
// const allGames = ref([]);

// const getRandomGames = () => {
//   const shuffled = [...allGames.value].sort(() => 0.5 - Math.random());
//   randomGames.value = shuffled.slice(0, 5);
// };

// const loadDataFromFirebase = () => {
//   const categoriesRef = dbRef(database, "categories");

//   onValue(categoriesRef, (snapshot) => {
//     const data = snapshot.val();

//     if (data) {
//       dataGame.categories = Object.values(data).map((category) => {
//         const shuffledGames = category.games.sort(() => 0.5 - Math.random());
//         return { category: category.category,games: shuffledGames.slice(0, 5) };
//       }); getRandomGames();
//     } else {
//       dataGame.categories = [];
//     }
//   });
// };

// onMounted(() => {
//   loadDataFromFirebase();
// });
</script>

