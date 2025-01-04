<script setup>
import ToggleDarkLight from './ToggleDarkLight.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="bg-black fixed top-0 w-full">
        <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a class="block text-teal-600 dark:text-teal-300" href="#">
                <span class="sr-only">Home</span>
                <img alt="Logo" src="/src/assets/logo.png" class="h-16 w-auto" draggable="false" />
            </a>

            <div class="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" class="hidden md:block">
                    <ul class="flex items-center gap-6 text-sm">
                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" href="#">
                                About
                            </a>
                        </li>

                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="#">
                                Careers
                            </a>
                        </li>

                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="#">
                                History
                            </a>
                        </li>

                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="#">
                                Services
                            </a>
                        </li>

                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="#">
                                Projects
                            </a>
                        </li>

                        <li>
                            <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="#">
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>

                

                <div class="flex items-center gap-4">
                    <ToggleDarkLight />
                    <div class="sm:flex sm:gap-4">
                        <a class="block rounded-md bg-[#DCD0FF] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#b197ff]"
                            href="#">
                            Login
                        </a>

                        <a class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                            href="#">
                            Register
                        </a>
                    </div>

                    <button
                        class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                        <span class="sr-only">Toggle menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>