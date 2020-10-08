<template>
  <v-app-bar app color="grey darken-4" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Popcorny Logo"
        class="shrink mr-2"
        contain
        src="../assets/popcorn-icon.png"
        transition="scale-transition"
        width="40"
      />
      <h3 class="font-weight-regular">Popcorny</h3>
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