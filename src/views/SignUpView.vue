<template>
    <div class="min-h-screen flex items-center justify-center bg-white/50 dark:bg-black/70 backdrop-blur-sm">
      <div class="w-full max-w-md p-8 bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-3xl font-bold text-[#b197ff] mb-8 text-center">Sign Up</h2>
  
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none"
            />
          </div>
  
          <button
            type="submit"
            class="w-full px-4 py-2 bg-[#b197ff] text-white font-semibold rounded-lg hover:bg-[#DCD0FF] transition-colors"
          >
            Sign Up
          </button>
  
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <RouterLink to="/login" class="text-[#b197ff] hover:underline">Log In</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>