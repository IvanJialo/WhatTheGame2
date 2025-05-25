<script setup>
import { RouterLink, useRouter } from 'vue-router';
import ToggleDarkLight from './ToggleDarkLight.vue';
import SearchInput from './SearchInput.vue';
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useAuth } from '@/data/auth'

const showProfileMenu = ref(false);
const profileMenuRef = ref(null);
const { user, logOut } = useAuth()
const showMobileMenu = ref(false);
const showSearchInput = computed(() => {
  return router.currentRoute.value.name === 'home';
});
const router = useRouter();
const showSearchModal = ref(false);

const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    showSearchModal.value = false;
    showMobileMenu.value = false;
  }
);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-gray-500 bg-gray-100/60 backdrop-blur dark:border-gray-400 dark:bg-black/60">
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center flex-1 md:flex-none">
        <img alt="Logo" src="../assets/logo.png" class="h-12 w-auto hidden dark:block md:h-16" draggable="false" />
        <img alt="Logo" src="../assets/logo_dark.png" class="h-12 w-auto dark:hidden md:h-16" draggable="false" />
      </div>

      <nav aria-label="Global" class="hidden md:flex flex-1 justify-left">
        <ul class="flex items-center gap-4 lg:gap-6 text-sm">
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/categories">
              Categories
            </RouterLink>
          </li>
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/most-played">
              Most Played
            </RouterLink>
          </li>
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/latest">
              Latest
            </RouterLink>
          </li>
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/hosting">
              Hosting
            </RouterLink>
          </li>
          <li>
            <RouterLink class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/subscription">
              Subscription
            </RouterLink>
          </li>

        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <button v-show="!showSearchInput" @click="showSearchModal = true" class="hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </button>


        <div class="hidden md:flex items-center gap-4">
          <ToggleDarkLight />

          <div v-if="!user" class="flex gap-2">
            <RouterLink
              class="block rounded-md bg-[#DCD0FF] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#b197ff]"
              to="/login">
              Login
            </RouterLink>
            <RouterLink
              class="hidden rounded-md bg-[#b197ff] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#DCD0FF] sm:block"
              to="/signup">
              Register
            </RouterLink>
          </div>

          <div v-else class="relative" ref="profileMenuRef">
            <button @click="showProfileMenu = !showProfileMenu"
              class="p-2 rounded-full hover:bg-[#DCD0FF] dark:hover:bg-[#b197ff]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A8.001 8.001 0 0112 15a8.001 8.001 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <div v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
              <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                {{ user.email }}
              </div>
              <hr class="border-gray-200 dark:border-gray-700" />
              <button @click="logOut"
                class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                Logout
              </button>
            </div>
          </div>
        </div>

        <button @click="showMobileMenu = !showMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-[#DCD0FF] dark:hover:bg-[#b197ff]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div v-show="showMobileMenu"
        class="md:hidden absolute top-16 inset-x-0 bg-white/70 dark:bg-black/70 border-b shadow-lg">
        <div class="px-4 py-4 space-y-4">
          <nav>
            <ul class="space-y-4">
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4" to="/"
                  @click="showMobileMenu = false">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/categories" @click="showMobileMenu = false">
                  Categories
                </RouterLink>
              </li>
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/most-played" @click="showMobileMenu = false">
                  Most Played
                </RouterLink>
              </li>
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/latest" @click="showMobileMenu = false">
                  Latest
                </RouterLink>
              </li>
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/hosting" @click="showMobileMenu = false">
                  Hosting
                </RouterLink>
              </li>
              <li>
                <RouterLink class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/subscription" @click="showMobileMenu = false">
                  Subscription
                </RouterLink>
              </li>
            </ul>
          </nav>

          <SearchInput class="w-full" />

          <div class="flex flex-col gap-4">
            <ToggleDarkLight />
            <div v-if="!user" class="flex flex-col gap-2">
              <RouterLink
                class="block text-center text-black font-medium py-2.5 bg-[#DCD0FF] hover:bg-[#b197ff] rounded-md"
                to="/login" @click="showMobileMenu = false">
                Login
              </RouterLink>
              <RouterLink
                class="block text-center text-black font-medium py-2.5 bg-[#b197ff] hover:bg-[#DCD0FF] rounded-md"
                to="/signup" @click="showMobileMenu = false">
                Register
              </RouterLink>
            </div>

            <div v-else class="flex flex-col gap-2 text-center">
              <span class="text-sm dark:text-white text-black">{{ user.email }}</span>
              <button @click="() => { logOut(); showMobileMenu = false }"
                class="text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md py-2">
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="showSearchModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="showSearchModal = false">
        <div class="bg-white/70 dark:bg-black/70 rounded-xl shadow-xl p-6 w-[90%] max-w-md relative" @click.self>
          <SearchInput />
        </div>
      </div>
    </Teleport>


  </header>
</template>