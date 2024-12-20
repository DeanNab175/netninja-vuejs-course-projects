<template>
    <div>
        <p>Reaction time: {{ score }} ms</p>
        <p class="rank">{{ rank }}</p>
    </div>
</template>

<script lang="ts">
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Results',
    components: {},
    props: ['score'],
    data() {
        return {
            rank: '',
        }
    },
    mounted() {
        if (this.score < 250) {
            this.rank = 'Ninja Fingers'
        } else if (this.score < 400) {
            this.rank = 'Rapid reflexes'
        } else {
            this.rank = 'Snail pace...'
        }
    },
}
</script>

<style>
.rank {
    font-size: 1.4em;
    color: #0faf87;
    font-weight: bold;
}
</style>
