import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddProject from '@/views/AddProject.vue'
import EditProject from '@/views/EditProject.vue'
import LoginView from '@/views/LoginView.vue'
import { supabase } from '@/lib/supabaseClient'
import SignupView from '@/views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/add',
      name: 'AddProject',
      component: AddProject,
      meta: { requiresAuth: true },
    },
    {
      path: '/project/:id',
      name: 'EditProject',
      component: EditProject,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session

  if ((to.path === '/login' || to.path === '/signup') && isLoggedIn) {
    next('/')
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
