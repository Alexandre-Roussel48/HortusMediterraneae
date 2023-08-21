import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/especes',
      name: 'especes',
      component: () => import('../views/EspecesView.vue'),
      children: [
        {
          path: 'create',
          name: 'especes_create',
          component: () => import('../views/especes/CreateView.vue')
        },
        {
          path: 'search',
          name: 'especes_search',
          component: () => import('../views/especes/SearchView.vue')
        },
        {
          path: ':id',
          name: 'especes_consult',
          component: () => import('../views/especes/ConsultView.vue')
        }
      ]
    },
    {
      path: '/pedagogie',
      name: 'pedagogie',
      component: () => import('../views/pedagogieView.vue'),
      children: [
        {
          path: 'create',
          name: 'pedagogie_create',
          component: () => import('../views/pedagogie/CreateView.vue')
        },
        {
          path: 'search',
          name: 'pedagogie_search',
          component: () => import('../views/pedagogie/SearchView.vue')
        },
        {
          path: ':id',
          name: 'pedagogie_consult',
          component: () => import('../views/pedagogie/ConsultView.vue')
        }
      ]
    },
    {
      path: '/medias',
      name: 'medias',
      component: () => import('../views/MediasView.vue'),
      children: [
        {
          path: 'create',
          name: 'medias_create',
          component: () => import('../views/medias/CreateView.vue')
        },
        {
          path: 'search',
          name: 'medias_search',
          component: () => import('../views/medias/SearchView.vue')
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ]
})

export default router