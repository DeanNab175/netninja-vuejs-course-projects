<template>
  <div>
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm.vue";

export default {
  name: "App",
  components: { SignupForm },
};
</script>

<style>
body {
  margin: 0;
  background: #eee;
}
</style>
