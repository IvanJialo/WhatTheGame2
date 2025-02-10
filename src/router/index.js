import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import MostPlayedView from '../views/MostPlayedView.vue'
import LatestView from '../views/LatestView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/most-played',
      name: 'most-played',
      component: MostPlayedView,
    },
    {
      path: '/latest',
      name: 'latest',
      component: LatestView,
    },
    {
      path: '/game/:id',
      name: 'game',
      component: GameView,
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
