<template>
  <form @submit.prevent="login">
    <p class="error">{{ message }}</p>
    <label>Email</label>
    <input type="email" v-model="email" placeholder="Email" />
    <label>Password</label>
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Login</span>
    </button>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </form>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      message: '',
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true
        const { error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        })
        if (error) throw error
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error)
        this.message = error?.message || 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
