<template>
  <section class="profile-bar">
    <div class="profile-bar-wrapper">
      <div v-if="user">
        <p>Hi, {{ displayName }}</p>
        <button class="btn" @click="logout">Logout</button>
      </div>

      <div v-else>
        <p>Sign in to add your projects.</p>
        <router-link class="btn-link" :to="{ name: 'Login' }">Login</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'ProfileBar',
  computed: {
    ...mapState(useUserStore, ['user', 'displayName']),
  },
  methods: {
    ...mapActions(useUserStore, ['clearUser']),
    async logout() {
      try {
        await supabase.auth.signOut()
        this.$router.push({ name: 'Login' })
      } catch (error) {
        console.error('Logout error:', error.message)
      }
    },
  },
}
</script>

<style>
.profile-bar {
  padding: 12px 16px;
  background: var(--primary-color);
  border-bottom: 3px solid #ffffff;
  color: #ffffff;
}

.profile-bar-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.profile-bar-wrapper div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
