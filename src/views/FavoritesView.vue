<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, getDoc, query, where, doc } from 'firebase/firestore'
import { db } from '@/data/firebase'
import { getGamesByIds } from '@/data/rawg'
import GameCard from '@/components/GameCard.vue'

const favorites = ref([])
const loading = ref(true)

onMounted(async () => {
  const user = getAuth().currentUser;
  if (!user) {
    console.log('No user is logged in.');
    loading.value = false;
    return;
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const ids = userData.favorites || [];
      console.log('Game IDs:', ids);

      if (ids.length > 0) {
        const games = await getGamesByIds(ids);
        favorites.value = games;
      } else {
        favorites.value = [];
      }
    } else {
      console.log('No such document!');
      favorites.value = [];
    }
  } catch (error) {
    console.error('Error cargando favoritos:', error);
  } finally {
    loading.value = false;
  }
});
</script>



<template>
  <section class="pt-28 pb-12 px-4 max-w-screen-xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black dark:text-white">Your Favorite Games</h1>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <span class="text-gray-500 dark:text-gray-400">Loading...</span>
    </div>

    <div v-else-if="favorites.length === 0" class="text-center text-gray-500 dark:text-gray-400">
      You haven't added any favorite games yet.
    </div>

    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <GameCard
        v-for="game in favorites"
        :key="game.id"
        :game="game"
      />
    </transition-group>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
