<template>
  <div class="bg-white/50 dark:bg-black/70 backdrop-blur-sm sm:py-12 animate-pulse">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-9">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <!-- Columna Izquierda -->
        <div class="space-y-8">
          <div class="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-gray-300 dark:bg-gray-700"></div>

          <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-4">
            <div class="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="space-y-2">
              <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 mt-6">
            <div class="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div class="grid grid-cols-2 gap-4">
              <div class="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha -->
        <div class="space-y-8">
          <div class="space-y-4">
            <div class="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>

            <div class="flex flex-wrap gap-4">
              <div class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div class="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div class="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="flex flex-wrap gap-2">
              <div v-for="n in 5" :key="'genre-' + n" class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="flex flex-wrap gap-2">
              <div v-for="n in 8" :key="'tag-' + n" class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="space-y-2">
              <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-3">
              <div class="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>

            <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-3">
              <div class="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="flex flex-wrap gap-2">
                <div v-for="n in 4" :key="'platform-' + n" class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl p-6 space-y-4">
            <div class="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
