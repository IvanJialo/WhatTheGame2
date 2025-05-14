<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import dataGame from '@/data/games.json';
import { getGameDetailsById, getGameStores, getGameTrailers, getStoreById, getGameScreenshots } from '@/data/rawg';

const gameScreenshots = ref([])
const storeNames = ref([])
const gameStores = ref([]);
const gameDetails = ref(null);
const gameTrailers = ref(null);
const route = useRoute();
// const game = ref(null);

watch(
  () => route.params.id,
  async (gameId) => {
    if (!gameId) return;

    try {
      // Obtener detalles del juego
      gameDetails.value = await getGameDetailsById(gameId);

      // Obtener tiendas asociadas al juego
      const response = await getGameStores(gameId);

      const rawStores = response.results;

      if (!rawStores || rawStores.length === 0) {
        gameStores.value = [];
      } else {
        const fullStores = await Promise.all(
          rawStores.map(async (store) => {
            const storeInfo = await getStoreById(store.store_id);
            return {
              name: storeInfo.name,
              slug: storeInfo.slug,
              url: store.url,
            };
          })
        );
        gameStores.value = fullStores;
      }

      // Obtener trailers
      gameTrailers.value = await getGameTrailers(gameId);

      // Obtener screenshots
      gameScreenshots.value = (await getGameScreenshots(gameId)).results;

    } catch (error) {
      console.error('Error al cargar datos del juego:', error);
    }
  },
  { immediate: true }
);


console.log("Store Names: " + storeNames)
console.log("Game Stores: " + gameStores)
console.log("Game Details: " + gameDetails)

// const findGame = (gameName) => {
//   return dataGame.categories.flatMap(category => category.games).find(game => game.name === gameName);
// };

// game.value = findGame(route.params.id);

// watch( () => route.params.id, (newGameName) => {
//     game.value = findGame(newGameName);
//   }
// );
</script>

<template>
  <div v-if="gameDetails" class=" bg-white/50 dark:bg-black/70 backdrop-blur-sm sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-9">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <div class="space-y-8">
          <div class="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
            <img :src="gameDetails.background_image" :alt="gameDetails.name"
              class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div v-if="gameStores.length" class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-4">
            <h3 class="text-xl font-bold text-[#b197ff]">Available on:</h3>
            <div class="grid grid-cols-1 gap-2">
              <a v-for="store in gameStores" :key="store.id" :href="store.url" target="_blank"
                class="flex items-center justify-between p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <span class="font-medium">{{ store.name }}</span>
                <i class="pi pi-external-link text-[#b197ff]"></i>
              </a>
            </div>
          </div>


        </div>

        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl font-bold text-[#b197ff]">
              {{ gameDetails.name }}
            </h1>

            <div class="flex flex-wrap gap-4 text-sm">
              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-calendar text-[#b197ff]"></i>
                <span>{{ gameDetails.released }}</span>
              </div>

              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-clock text-[#b197ff]"></i>
                <span>{{ gameDetails.playtime }}h</span>
              </div>

              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-star text-[#b197ff]"></i>
                <span>Rating: {{ gameDetails.rating }}/5</span>
              </div>

              <div class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-users text-[#b197ff]"></i>
                <span>Age: {{ gameDetails.esrb_rating.name }}</span>
              </div>
            </div>
          </div>

          <div v-if="gameDetails?.genres?.length" class="mt-4">
            <h2 class="text-lg font-semibold mb-2 color text-[#b197ff]">Genres</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="genre in gameDetails.genres" :key="genre.id"
                class="px-3 py-1 bg-white/80 dark:bg-black/80 backdrop-blur text-sm rounded-full">
                {{ genre.name }}
              </span>
            </div>
          </div>

          <div v-if="gameDetails?.tags?.length" class="mt-4">
            <h2 class="text-lg font-semibold mb-2 text-[#b197ff]">Popular Tags</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in gameDetails.tags.slice(0, 10)" :key="tag.id"
                class="px-3 py-1 bg-white/80 dark:bg-black/80 backdrop-blur text-sm rounded-full">
                {{ tag.name }}
              </span>
            </div>
          </div>

          <div class="prose dark:prose-invert max-w-none">
            <h2 class="text-lg font-semibold mb-2 text-[#b197ff]">Description</h2>
            <p class="text-lg">{{ gameDetails.description_raw }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
              <h3 class="text-xl font-bold text-[#b197ff] mb-4">Development</h3>
              <div class="space-y-2">
                <p><strong>Developers: </strong>
                  <span v-for="(developer, index) in gameDetails.developers" :key="developer.id">
                    {{ developer.name }}<span v-if="index !== gameDetails.developers.length - 1">, </span>
                  </span>
                </p>
                <p><strong>Publishers: </strong>
                  <span v-for="(publisher, index) in gameDetails.publishers" :key="publisher.id">
                    {{ publisher.name }}<span v-if="index !== gameDetails.publishers.length - 1">, </span>
                  </span>
                </p>
              </div>
            </div>

            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
              <h3 class="text-xl font-bold text-[#b197ff] mb-4">Platforms</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="platform in gameDetails.platforms" :key="platform.platform.id"
                  class="px-3 py-1.5 rounded-full bg-[#b197ff]/10 text-sm">
                  {{ platform.platform.name }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="gameTrailers" class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Trailer</h3>
            <div class="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <video controls class="w-full h-full object-cover">
                <source :src="gameTrailers.results[0].data.max" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div v-if="gameScreenshots.length > 0" class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 mt-8">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Capturas de pantalla</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(screenshot, index) in gameScreenshots" :key="index"
                class="rounded-lg overflow-hidden shadow-md">
                <img :src="screenshot.image" :alt="`Screenshot ${index + 1}`" class="w-full h-auto object-cover" />
              </div>
            </div>
          </div>




          <!-- <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Reviews</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(score, source) in game.reviews" :key="source" class="p-4 rounded-lg bg-[#b197ff]/10">
                <p class="font-bold">{{ source }}</p>
                <p class="text-2xl">{{ score }}</p>
              </div>
            </div>
          </div> -->

          <!-- <div class="space-y-4">
            <h3 class="text-xl font-bold text-[#b197ff]">Media</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a v-for="(link, index) in game.tutorial_links" :key="index" :href="link" target="_blank"
                class="flex items-center justify-center p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <i class="pi pi-youtube text-2xl mr-2 text-[#b197ff]"></i>
                <span>Gameplay Tutorial {{ index + 1 }}</span>
              </a>
              <a :href="game.trailer_preview" target="_blank"
                class="flex items-center justify-center p-4 rounded-lg bg-[#b197ff]/10 hover:bg-[#b197ff]/20 transition-colors">
                <i class="pi pi-play text-2xl mr-2 text-[#b197ff]"></i>
                <span>Watch Trailer</span>
              </a>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
    <p class="text-gray-700">Game not found.</p>
  </div>
</template>
