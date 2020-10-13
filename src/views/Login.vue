<template>
  <v-container fluid class="login-container">
    <v-row justify="center" class="px-8 mt-4">
      <v-col style="max-width: 500px">
        <v-card>
          <v-container style="background-color: #e15c64" class="white--text">
            <v-row>
              <v-col class="py-0">
                <h3>Easy Login</h3>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-container v-if="!$apollo.loading" fluid class="pa-4">
            <v-row>
              <v-col class="py-1">
                <v-text-field
                  @keyup.enter="login"
                  placeholder="Your name"
                  v-model="inputUsername"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-center">
                <v-btn
                  color="primary"
                  :disabled="inputUsername.length === 0"
                  @click="login"
                  >Login</v-btn
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
    login() {
      if (this.inputUsername.length < 4) {
        this.$store.commit('showSnackbar', {
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
              text: 'User not found',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  height: calc(100vh - 56px);
  background-color: #f0e3ce;
}
</style>
