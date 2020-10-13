<template>
  <v-app-bar app color="grey darken-4" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Popcorny Logo"
        class="shrink mr-4"
        contain
        src="../assets/popcorn-icon.png"
        transition="scale-transition"
        width="40"
      />
      <router-link to="/"><h1 class="brand-title">Popcorny</h1></router-link>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    userIsLoggedIn() {
      return this.$store.state.username !== undefined;
    }
  }
};
</script>

<style scoped>
.v-app-bar >>> h1.brand-title {
  color: #fff;
  font-size: 2rem;
}
</style>
