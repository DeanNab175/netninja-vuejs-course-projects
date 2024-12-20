<template>
    <div class="block" v-if="showBlock" @click="stopTimer">click me</div>
</template>

<script lang="ts">
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Block',
    components: {},
    props: ['delay'],
    data() {
        return {
            showBlock: false,
            timer: 0,
            reactionTime: 0,
        }
    },
    mounted() {
        setTimeout(() => {
            this.showBlock = true
            this.startTimer()
        }, this.delay)
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                this.reactionTime += 10
            }, 10)
        },
        stopTimer() {
            clearInterval(this.timer)
            this.$emit('end', this.reactionTime)
        },
    },
}
</script>

<style>
.block {
    width: 400px;
    border-radius: 20px;
    background-color: #0faf87;
    color: #ffffff;
    text-align: center;
    padding: 100px 0;
    margin: 40px auto;
}
</style>
