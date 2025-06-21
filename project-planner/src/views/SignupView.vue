<template>
  <form @submit.prevent="signup">
    <p class="error">{{ message }}</p>
    <label>Email</label>
    <input type="email" v-model="email" placeholder="Email" />
    <label>Username</label>
    <input type="text" v-model="username" placeholder="Username" />
    <label>Password</label>
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Sign up</span>
    </button>
    <p>Already have an account? <router-link to="/login">Log in</router-link></p>
  </form>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      message: '',
      isLoading: false,
    }
  },
  methods: {
    async signup() {
      this.isLoading = true
      console.log(this.username, this.email, this.password)

      try {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        })

        if (error) {
          throw new Error(error.message)
        }

        const userId = signUpData.user?.id

        // Insert display name into the profiles table
        if (userId) {
          await supabase.from('profiles').insert({
            id: userId,
            display_name: this.username,
          })

          this.message = 'Signup successful! Check your email for confirmation.'
        }

        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.message = error.message
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
