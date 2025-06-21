import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from './stores/userStore'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
;(async () => {
  const userStore = useUserStore()
  await userStore.fetchUser()
  await userStore.fetchUserProfile()

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      userStore.setUser(session?.user)
      await userStore.fetchUserProfile()
    } else if (event === 'SIGNED_OUT') {
      userStore.clearUser()
    }
  })

  app.mount('#app')
})()
