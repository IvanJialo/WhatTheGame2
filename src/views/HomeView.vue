<script setup>
import { getGamesHome } from "@/data/rawg";
import { ref, onMounted } from "vue";
import HeroBanner from "@/components/HeroBanner.vue";
import GameCard from "@/components/GameCard.vue";
import GameCardSkeleton from "@/components/GameCardSkeleton.vue";
import SearchInput from "@/components/SearchInput.vue";

const searchQuery = ref("");
const allGames = ref([]);
const randomGames = ref([]);
const loading = ref(true);

const forbiddenTags = ["Hentai", "NSFW", "Sexual Content", "Nudity"];

function isGameAllowed(game) {
  if (!game.tags || !Array.isArray(game.tags)) return true;
  const tagsLower = game.tags.map(tag => tag.name.toLowerCase());
  return !tagsLower.some(tag =>
    forbiddenTags.map(f => f.toLowerCase()).includes(tag)
  );
}

const getRandomGames = () => {
  const withCover = allGames.value.filter(
    game => game.background_image && isGameAllowed(game)
  );
  if (withCover.length < 5) {
    randomGames.value = []; // no mostrar nada si no hay suficientes
    return;
  }

  const shuffled = withCover.sort(() => 0.5 - Math.random());
  randomGames.value = shuffled.slice(0, 5);
};

onMounted(async () => {
  try {
    const gamesFromAPI = await getGamesHome();
    allGames.value = Array.isArray(gamesFromAPI?.results)
      ? gamesFromAPI.results
      : Array.isArray(gamesFromAPI)
        ? gamesFromAPI
        : [];

    getRandomGames();
  } catch (error) {
    console.error("Error al cargar juegos:", error);
  } finally {
    loading.value = false;
  }
});
</script>



<template>
  <main class="bg-white/50 dark:bg-black/70">
    <HeroBanner class="animate-blurred-fade-in" />
    <SearchInput v-model="searchQuery"
      class="animate-blurred-fade-in mt-8 max-w-[80%] sm:max-w-[60%] xl:max-w-[30%] mb-44 sm:mt-16 lg:mt-20" />

    <div class="text-center gap-8 sm:gap-16 m-8 sm:m-20 mt-32 sm:mt-64">
      <h2 class="text-2xl sm:text-3xl font-bold mb-8 sm:-mb-20">
        Here you have some games you may like!
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-10 m-8 sm:m-36">
        <GameCardSkeleton v-if="loading" v-for="n in 5" :key="n" />
        <GameCard v-for="game in randomGames" :key="game.name" :game="game" class="w-full h-full" />
      </div>
    </div>
  </main>
</template>