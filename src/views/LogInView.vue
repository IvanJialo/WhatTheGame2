<template>
    <div class="min-h-screen flex items-center justify-center bg-white/50 dark:bg-black/70 backdrop-blur-sm">
      <div class="w-full max-w-md p-8 bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-3xl font-bold text-[#b197ff] mb-8 text-center">Log In</h2>
  
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full px-4 py-2 bg-[#b197ff] text-white font-semibold rounded-lg hover:bg-[#DCD0FF] transition-colors"
          >
            Log In
          </button>
  
          <!-- Sign Up Link -->
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <RouterLink to="/signup" class="text-[#b197ff] hover:underline">Sign Up</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleLogin = () => {
    // Lógica de autenticación aquí
    console.log('Logging in with:', email.value, password.value);
    router.push('/'); // Redirigir al home después del login
  };
  </script>