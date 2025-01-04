<template>
    <label for="theme-toggle" class="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent]">
      <input type="checkbox" id="theme-toggle" class="peer sr-only" v-model="isDarkTheme" />
    
      <span class="absolute inset-y-0 start-0 z-10 m-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full transition-all peer-checked:start-6" :class="{ 'bg-black text-white': isDarkTheme, 'bg-white text-gray-400': !isDarkTheme }">
        <i v-if="isDarkTheme" class="pi pi-moon text-xs"></i>
        <i v-else class="pi pi-sun text-xs"></i>
      </span>
    </label>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDarkTheme: false
      }
    },
    watch: {
      isDarkTheme(newValue) {
        if (newValue) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }
  </script>