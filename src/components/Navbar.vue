<script setup>
import { RouterLink } from 'vue-router';
import ToggleDarkLight from './ToggleDarkLight.vue';
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-gray-500 bg-gray-100/60 backdrop-blur dark:border-gray-400 dark:bg-black/60"
  >
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <span class="sr-only">Home</span>
        <img alt="Logo" src="../assets/logo.png" class="h-16 w-auto hidden dark:block" draggable="false" />
        <img alt="Logo" src="../assets/logo_dark.png" class="h-16 w-auto dark:hidden" draggable="false" />
      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
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
          <ToggleDarkLight />
          <div class="sm:flex sm:gap-4">
            <a
              class="block rounded-md bg-[#DCD0FF] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#b197ff]"
              href="#"
            >
              Login
            </a>

            <a
              class="hidden rounded-md bg-[#b197ff] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#DCD0FF] sm:block"
              href="#"
            >
              Register
            </a>
          </div>

          <button
            class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
