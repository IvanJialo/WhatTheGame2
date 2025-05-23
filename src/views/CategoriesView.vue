<template>
  <div class="bg-white/50 dark:bg-black/70">
    <!-- Loading skeleton global mientras no hay datos -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:ml-36 sm:mr-36 mt-28">
      <GameCardSkeleton v-for="n in 10" :key="n" class="animate-pulse" />
    </div>

    <!-- Una vez cargado -->
    <div v-else>
      <div
        v-for="category in genreGames"
        :key="category.category"
        class="text-center gap-8 sm:gap-16 m-8 mt-20 sm:m-20 "
      >
        <h2 class="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-[#b197ff] dark:text-[#d0bfff]">
          {{ category.category }}
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:ml-36 sm:mr-36">
          <GameCard
            v-for="game in category.games"
            :key="game.id"
            :game="game"
          />
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { onMounted, ref } from "vue";
import GameCard from "../components/GameCard.vue";
import GameCardSkeleton from "../components/GameCardSkeleton.vue";
import { getGameGenres, getGamesByGenre } from "@/data/rawg";

const genres = ref([]);
const genreGames = ref([]);
const loading = ref(true);

const REQUIRED_COUNT = 10;

const fetchValidGamesByGenre = async (genreId) => {
  let page = 1;
  const validGames = [];

  while (validGames.length < REQUIRED_COUNT) {
    const response = await getGamesByGenre(genreId);
    if (!response.results.length) break;

    const withCovers = response.results.filter(game => game.background_image);
    validGames.push(...withCovers);
    page++;
  }

  return validGames.slice(0, REQUIRED_COUNT);
};

onMounted(async () => {
  try {
    const allGenres = await getGameGenres();
    genres.value = allGenres.results;

    const randomGenres = genres.value.sort(() => 0.5 - Math.random()).slice(0, 10);

    const promises = randomGenres.map(async (genre) => {
      const games = await fetchValidGamesByGenre(genre.id);
      return {
        category: genre.name,
        games,
      };
    });

    genreGames.value = await Promise.all(promises);
  } catch (error) {
    console.error("Error al obtener juegos por género:", error);
  } finally {
    loading.value = false;
  }
});
</script>

