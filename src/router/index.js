import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnimeDetailView from '../views/AnimeDetailView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'
import CharactersView from '../views/CharactersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/anime/:id',
      name: 'AnimeDetail',
      component: AnimeDetailView,
      props: true,
    },
    {
      path: '/character/:id',
      name: 'CharacterDetail',
      component: CharacterDetailView,
      props: true,
    },
    {
      path: '/characters',
      name: 'Characters',
      component: CharactersView,
    },
  ],
})

export default router
