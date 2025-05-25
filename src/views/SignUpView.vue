<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-white/50 dark:bg-black/70 backdrop-blur-sm">
    <div class="w-full max-w-md p-8 bg-white/80 dark:bg-black/80 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 class="text-3xl font-bold text-[#b197ff] mb-8 text-center">Sign Up</h2>

      <form class="space-y-6" @submit.prevent="register">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#b197ff] focus:border-[#b197ff] outline-none dark:bg-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 bg-[#b197ff] text-white font-semibold rounded-lg hover:bg-[#DCD0FF] transition-colors"
        >
          Sign Up
        </button>

        <p v-if="errorMessage" class="text-center text-red-500 text-sm mt-2">{{ errorMessage }}</p>

        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <RouterLink to="/login" class="text-[#b197ff] hover:underline">Log In</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { auth, db } from '@/data/firebase'  // asegúrate que exportas 'db' en firebase.js
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

const register = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await updateProfile(user, { displayName: name.value })

    // Guardar datos extra en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name.value,
      email: email.value,
      favorites: []
    })

    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
