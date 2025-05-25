<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { auth, db } from '@/data/firebase'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore'
import { getGameDetailsById, getGameStores, getGameTrailers, getStoreById, getGameScreenshots } from '@/data/rawg';
import GameSkeleton from '@/components/GameSkeleton.vue';

const gameScreenshots = ref([])
const storeNames = ref([])
const gameStores = ref([]);
const gameDetails = ref(null);
const gameTrailers = ref(null);
const route = useRoute();
const selectedScreenshot = ref(null);
const showModal = ref(false);
const loading = ref(true);
const user = ref(auth.currentUser)
const isFavorite = ref(false)

const openModal = (image) => {
  selectedScreenshot.value = image;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedScreenshot.value = null;
};

auth.onAuthStateChanged((u) => {
  user.value = u
})

const checkFavorite = async (gameId) => {
  if (!user.value) return
  const userDocRef = doc(db, 'users', user.value.uid)
  const docSnap = await getDoc(userDocRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    isFavorite.value = data.favorites?.includes(gameId) || false
  }
}

const toggleFavorite = async (gameId) => {
  if (!user.value) {
    alert('Tienes que iniciar sesión para guardar favoritos')
    return
  }

  const userDocRef = doc(db, 'users', user.value.uid)

  // Si el documento del usuario no existe aún, lo creamos con un array vacío
  const docSnap = await getDoc(userDocRef)
  if (!docSnap.exists()) {
    await setDoc(userDocRef, {
      favorites: []
    })
  }

  if (isFavorite.value) {
    await updateDoc(userDocRef, {
      favorites: arrayRemove(gameId)
    })
    isFavorite.value = false
  } else {
    await updateDoc(userDocRef, {
      favorites: arrayUnion(gameId)
    })
    isFavorite.value = true
  }
}

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

      await checkFavorite(gameId)

      loading.value = false;

    } catch (error) {
      console.error('Error al cargar datos del juego:', error);

      loading.value = false;
    }
  },
  { immediate: true }
);

</script>

<template>

  <GameSkeleton v-if="loading" />

  <div v-else-if="gameDetails" class=" bg-white/50 dark:bg-black/70 backdrop-blur-sm sm:py-12">
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

          <!-- Galería de screenshots -->
          <div v-if="gameScreenshots && gameScreenshots.length > 0"
            class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 mt-6">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Screenshots</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(screenshot, index) in gameScreenshots" :key="screenshot.id"
                class="rounded-lg overflow-hidden shadow-md cursor-zoom-in" @click="openModal(screenshot.image)">
                <img :src="screenshot.image" :alt="`Screenshot ${index + 1}`"
                  class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" />
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <div class="space-y-4">
            <h1 v-if="gameDetails.name" class="text-4xl sm:text-5xl font-bold text-[#b197ff]">
              {{ gameDetails.name }}
            </h1>

            <div class="flex items-center gap-2 mt-4">
              <button v-if="user" @click="toggleFavorite(route.params.id)"
                class="group relative flex items-center gap-2 text-sm md:text-base px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg"
                  :class="['h-5 w-5 transition-transform duration-300', isFavorite ? 'fill-red-500 scale-125' : 'fill-white group-hover:scale-110']"
                  viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
                    4.42 3 7.5 3c1.74 0 3.41 0.81
                    4.5 2.09C13.09 3.81 14.76 3 16.5
                    3 19.58 3 22 5.42 22 8.5c0
                    3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {{ isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
              </button>
            </div>


            <div class="flex flex-wrap gap-4 text-sm">
              <div v-if="gameDetails.released"
                class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-calendar text-[#b197ff]"></i>
                <span>{{ gameDetails.released }}</span>
              </div>

              <div v-if="gameDetails.playtime"
                class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-clock text-[#b197ff]"></i>
                <span>{{ gameDetails.playtime }}h</span>
              </div>

              <div v-if="gameDetails.rating"
                class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
                <i class="pi pi-star text-[#b197ff]"></i>
                <span>Rating: {{ gameDetails.rating }}/5</span>
              </div>

              <div v-if="gameDetails.esrb_rating"
                class="flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full">
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

          <div v-if="gameDetails.description_raw" class="prose dark:prose-invert max-w-none">
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

            <div v-if="gameDetails.platforms.length" class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
              <h3 class="text-xl font-bold text-[#b197ff] mb-4">Platforms</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="platform in gameDetails.platforms" :key="platform.platform.id"
                  class="px-3 py-1.5 rounded-full bg-[#b197ff]/10 text-sm">
                  {{ platform.platform.name }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="gameTrailers?.results?.length" class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6">
            <h3 class="text-xl font-bold text-[#b197ff] mb-4">Trailer</h3>
            <div class="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <video controls class="w-full h-full object-cover">
                <source :src="gameTrailers.results[0].data.max" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
    <p class="text-gray-700">Game not found.</p>
  </div>

  <!-- Modal para imagen ampliada -->
  <div v-if="showModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    @click.self="closeModal">
    <div class="max-w-5xl max-h-[90vh] overflow-hidden rounded-lg">
      <img :src="selectedScreenshot" alt="Expanded Screenshot" class="w-full h-auto object-contain" />
    </div>
    <button @click="closeModal" class="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300">
      &times;
    </button>
  </div>

</template>
