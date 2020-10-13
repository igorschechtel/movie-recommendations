<template>
  <v-app-bar app color="grey darken-4" dark>
    <v-row class="align-center">
      <v-col cols="auto">
        <router-link to="/">
          <div class="d-flex align-center">
            <v-img
              alt="Popcorny Logo"
              class="shrink"
              contain
              src="@/assets/popcorn-icon.png"
              transition="scale-transition"
              width="40"
            />
            <h1 class="brand-title d-none d-sm-inline mx-4">Popcorny</h1>
          </div>
        </router-link>
      </v-col>

      <v-col v-if="userIsLoggedIn">
        <div class="mx-4 mt-6" style="max-width: 400px;">
          <v-text-field
            append-icon="mdi-search"
            placeholder="Search for movies"
            v-model="searchInput"
            @keyup.enter="doSearch"
          />
        </div>
      </v-col>

      <v-col cols="auto" v-if="userIsLoggedIn">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-icon large class="mr-2">mdi-account-box</v-icon>
                <span class="d-none d-sm-inline">{{ userName }}</span>
              </div>
            </template>
            <v-list>
              <v-list-item link to="/profile">
                <v-list-item-title>Edit Profile</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="$router.go()">
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    searchInput: '',
  }),

  computed: {
    userIsLoggedIn() {
      return this.$store.getters.userIsLoggedIn;
    },
    userName() {
      return this.$store.getters.userName;
    },
  },

  methods: {
    doSearch() {
      const query = this.searchInput;
      this.searchInput = '';
      this.$router.push({
        path: '/search',
        query: { query },
      });
    },
  },
};
</script>

<style scoped>
.v-app-bar >>> h1.brand-title {
  color: #fff;
  font-size: 2rem;
}
</style>
