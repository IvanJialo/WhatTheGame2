// src/composables/auth.js
import { ref, onMounted } from 'vue'
import { auth } from '@/data/firebase' // tu config Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const user = ref(null)

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
})

export function useAuth() {
  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    await signOut(auth)
  }

  return {
    user,
    signUp,
    logIn,
    logOut
  }
}
