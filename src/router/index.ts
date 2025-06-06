import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../pages/CreateTask.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../pages/CreateTask.vue'),
      props: true
    },
  ],
})

export default router
