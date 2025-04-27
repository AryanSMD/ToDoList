import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CreateTask from '../pages/CreateTask.vue'

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
      component: CreateTask,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: CreateTask,
      props: true
    },
  ],
})

export default router
