<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="snackbar.bgColor"
    :dark="snackbar.isDark"
    style="z-index: 5 !important;"
    :timeout="2000"
  >
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="showSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    showSnackbar: {
      get() {
        return this.$store.getters.showSnackbar;
      },
      set(show) {
        if (show) {
          this.$store.commit("showSnackbar");
        } else {
          this.$store.commit("hideSnackbar");
        }
      }
    },
    snackbar: {
      get() {
        return this.$store.getters.snackProps;
      }
    }
  }
};
</script>
