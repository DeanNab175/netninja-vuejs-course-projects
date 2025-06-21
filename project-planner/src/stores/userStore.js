import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    displayName: null,
  }),
  actions: {
    async fetchUser() {
      const { data } = await supabase.auth.getSession()
      this.user = data?.session?.user ?? null
    },
    async fetchUserProfile() {
      if (!this.user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', this.user.id)
        .single()

      if (!error) {
        this.displayName = data.display_name
      } else {
        this.displayName = this.user?.email
        console.error('Error fetching display name:', error.message)
      }
    },
    setUser(newUser) {
      this.user = newUser
    },
    clearUser() {
      this.user = null
      this.displayName = null
    },
  },
})
