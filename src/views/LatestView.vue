<script setup>
import { onMounted, ref } from "vue";
import GameCard from "../components/GameCard.vue";
import GameCardSkeleton from "../components/GameCardSkeleton.vue";
import { getLatestGames } from "@/data/rawg";

const latestGames = ref([]);
const loading = ref(true);

// Tags a excluir
const forbiddenTags = ["Hentai", "NSFW", "Sexual Content", "Nudity"];

function isGameAllowed(game) {
  if (!game.tags || !Array.isArray(game.tags)) return true;
  const tagsLower = game.tags.map(tag => tag.name.toLowerCase());
  return !tagsLower.some(tag => forbiddenTags.map(f => f.toLowerCase()).includes(tag));
}

onMounted(async () => {
  try {
    let page = 1;
    let validGames = [];

    while (validGames.length < 20 && page <= 10) { // max 10 páginas para evitar bucle infinito
      const data = await getLatestGames(page); // asegúrate que tu función acepte `page`
      const filtered = data.results.filter(game =>
        game.background_image &&
        isGameAllowed(game)
      );
      validGames.push(...filtered);
      page++;
    }

    latestGames.value = validGames.slice(0, 20);
  } catch (error) {
    console.error("Error al obtener juegos:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-white/50 dark:bg-black/70">
    <div class="text-center gap-8 sm:gap-16 m-8 mt-24 sm:m-20">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:-mb-20 text-[#b197ff] dark:text-[#d0bfff]">
        Latest
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-16 2xl:gap-9 p-4 sm:m-36">
        <!-- Skeletons mientras carga -->
        <GameCardSkeleton
          v-if="loading"
          v-for="n in 10"
          :key="`skeleton-${n}`"
          class="animate-pulse"
        />

        <!-- Juegos reales -->
        <GameCard
          v-else
          v-for="game in latestGames"
          :key="game.name"
          :game="game"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

