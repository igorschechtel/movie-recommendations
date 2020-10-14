<template>
  <v-container fluid class="signin-container">
    <v-row justify="center" class="px-8 mt-4">
      <v-col style="max-width: 500px">
        <v-card>
          <v-container style="background-color: #e15c64" class="white--text">
            <v-row>
              <v-col class="py-0">
                <h3>Easy Sign In</h3>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-container v-if="!$apollo.loading" fluid class="pa-4">
            <v-row>
              <v-col class="py-1">
                <v-text-field
                  @keyup.enter="signIn"
                  placeholder="Your username"
                  v-model="inputUsername"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-center">
                <v-btn
                  color="primary"
                  :disabled="inputUsername.length === 0"
                  @click="signIn"
                  >Sign In</v-btn
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-center">
                <router-link to="/register" class="grey--text"
                  >Don't have an account? Register here</router-link
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    inputUsername: '',
  }),

  methods: {
    signIn() {
      if (this.inputUsername.length < 4) {
        this.$store.commit('showSnackbar', {
          bgColor: 'error',
          text: 'Username must have at least 4 characters',
        });
        return;
      }

      this.$apollo
        .query({
          query: require('@/graphql/users/GetUser.gql'),
          variables: { name: this.inputUsername },
        })
        .then(({ data }) => {
          if (data.User.length > 0) {
            this.$store.commit('setUser', {
              isLoggedIn: true,
              name: data.User[0].name,
              id: data.User[0].userId,
            });
            this.$router.replace('/');
          } else {
            this.$store.commit('showSnackbar', {
              bgColor: 'error',
              text: 'User not found',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.signin-container {
  height: calc(100vh - 56px);
  background-color: #f0e3ce;
}
</style>
