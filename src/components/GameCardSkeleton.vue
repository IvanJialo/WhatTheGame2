<template>
  <div class="group relative block h-64 sm:h-80 lg:h-96 cursor-wait animate-pulse">
    <!-- Desktop 2XL -->
    <div class="hidden 2xl:block overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700 h-full w-full">
      <div class="h-5/6 w-full bg-gray-400 dark:bg-gray-600"></div>
      <div class="p-4 bg-black/50 text-white">
        <div class="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
      </div>
    </div>

    <!-- Mobile / Tablet -->
    <div class="2xl:hidden flex flex-col h-full">
      <div class="relative flex-1 overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
        <div class="h-full w-full bg-gray-400 dark:bg-gray-600"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
          <div class="h-4 bg-gray-500 rounded w-2/3 mb-2"></div>
          <div class="h-3 bg-gray-400 rounded w-1/3"></div>
        </div>
      </div>
      <div class="mt-2 px-2 text-center">
        <div class="flex flex-wrap gap-2 justify-center">
          <div class="h-4 w-16 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div class="h-4 w-12 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div class="mt-1 h-3 w-20 bg-yellow-400 rounded mx-auto"></div>
      </div>
    </div>
  </div>
</template>
