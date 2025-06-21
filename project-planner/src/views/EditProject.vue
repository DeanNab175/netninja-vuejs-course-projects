<template>
  <p v-if="isLoadingProjectData">Loading...</p>
  <form @submit.prevent="handleSubmit" v-else>
    <label>Title</label>
    <input type="text" v-model="title" required />
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <button type="submit" :disabled="isUpdating">
      <span v-if="isUpdating">Loading...</span>
      <span v-else>Update Project</span>
    </button>
  </form>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/lib/supabaseClient'

export default {
  name: 'EditProject',
  props: ['id'],
  data() {
    return {
      title: '',
      details: '',
      isLoadingProjectData: false,
      isUpdating: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  async mounted() {
    const data = await this.fetchProject()

    if (data) {
      this.title = data.title
      this.details = data.details
    }
  },
  methods: {
    async handleSubmit() {
      const projectData = {
        title: this.title,
        details: this.details,
      }

      try {
        this.isUpdating = true
        await supabase.from('projects').update(projectData).eq('id', this.id)

        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error updating project:', error)
      } finally {
        this.isUpdating = false
      }
    },
    async fetchProject() {
      try {
        this.isLoadingProjectData = true
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', this.user.id)
          .eq('id', this.id)
        return data?.[0]
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        this.isLoadingProjectData = false
      }
    },
  },
}
</script>
