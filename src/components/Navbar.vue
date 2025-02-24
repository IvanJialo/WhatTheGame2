<script setup>
import { RouterLink } from 'vue-router';
import ToggleDarkLight from './ToggleDarkLight.vue';
import SearchInput from './SearchInput.vue';
import { ref } from 'vue';

const showMobileMenu = ref(false);
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
            <RouterLink
              class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              to="/"
            >
              Home
            </RouterLink>
          </li>
          <li>
              <RouterLink
                class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                to="/categories"
              >
                Categories
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                to="/most-played"
              >
                Most Played
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                to="/latest"
              >
                Latest
              </RouterLink>
            </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <SearchInput class="hidden md:block w-full max-w-[200px] lg:max-w-[250px]" />

        <div class="hidden md:flex items-center gap-4">
          <ToggleDarkLight />
          <div class="flex gap-2">
            <RouterLink
              class="block rounded-md bg-[#DCD0FF] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#b197ff]"
              to="/login"
            >
              Login
            </RouterLink>

            <RouterLink
              class="hidden rounded-md bg-[#b197ff] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#DCD0FF] sm:block"
              to="/signup"
            >
              Register
            </RouterLink>
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
                <RouterLink
                  class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/categories" @click="showMobileMenu = false">
                  Categories
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/most-played" @click="showMobileMenu = false">
                  Most Played
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="block py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4"
                  to="/latest" @click="showMobileMenu = false">
                  Latest
                </RouterLink>
              </li>
            </ul>
          </nav>

          <SearchInput class="w-full" @submit.prevent="showMobileMenu = false" />

          <div class="flex flex-col gap-4">
            <ToggleDarkLight />
            <div class="flex flex-col gap-2">
              <RouterLink class="block text-center text-black font-medium py-2.5 bg-[#DCD0FF] hover:bg-[#b197ff] rounded-md" to="/login" @click="showMobileMenu = false">
                Login
              </RouterLink>
              <RouterLink class="block text-center text-black font-medium py-2.5 bg-[#b197ff] hover:bg-[#DCD0FF] rounded-md" to="/signup" @click="showMobileMenu = false">
                Register
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>