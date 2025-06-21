<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <span class="material-symbols-outlined"> edit </span>
        </router-link>
        <span
          class="material-symbols-outlined action-btn"
          :class="{ disabled: isDeleteLoading }"
          @click="deleteProject"
        >
          delete
        </span>
        <span
          class="material-symbols-outlined tick action-btn"
          :class="{ disabled: isCheckLoading }"
          @click="toggleComplete"
        >
          check
        </span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      {{ project.details }}
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'

export default {
  props: ['project'],
  data() {
    return {
      showDetails: false,
      isCheckLoading: false,
      isDeleteLoading: false,
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    async deleteProject() {
      try {
        this.isDeleteLoading = true
        await supabase.from('projects').delete().eq('id', this.project.id)
        this.$emit('delete', this.project.id)
      } catch (error) {
        console.error('Error deleting project:', error)
      } finally {
        this.isDeleteLoading = false
      }
    },
    async toggleComplete() {
      try {
        this.isCheckLoading = true
        await supabase
          .from('projects')
          .update({ complete: !this.project.complete })
          .eq('id', this.project.id)

        this.$emit('complete', this.project.id)
      } catch (error) {
        console.error('Error toggling project completion:', error)
      } finally {
        this.isCheckLoading = false
      }
    },
  },
}
</script>

<style scoped>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-symbols-outlined {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-symbols-outlined:hover {
  color: #777;
}
/* completed projects */
.project.complete {
  border-left: 4px solid var(--primary-color);
}
.project.complete .tick {
  color: var(--primary-color);
}

.action-btn.disabled,
.action-btn.disabled:hover {
  pointer-events: none;
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
