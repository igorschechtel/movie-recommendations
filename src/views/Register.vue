<template>
  <v-container fluid class="register-container">
    <v-row justify="center" class="px-8 mt-4">
      <v-col style="max-width: 500px">
        <v-card>
          <v-container style="background-color: #e15c64" class="white--text">
            <v-row>
              <v-col class="py-0">
                <h3>Register</h3>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-container fluid class="pa-4">
            <v-row>
              <v-col>
                <p class="grey--text text--darken-2 mb-1">
                  Just type your name and you're ready to go.
                </p>
              </v-col>
            </v-row>

            <ApolloMutation
              :mutation="require('@/graphql/users/CreateUser.gql')"
              :variables="{
                name: inputUsername,
              }"
              @done="onDone"
            >
              <template v-slot="{ mutate, loading, error }">
                <v-row>
                  <v-col class="py-1">
                    <p v-if="loading">Registering user...</p>
                    <p v-else-if="error">An error occurred: {{ error }}</p>
                    <v-text-field
                      v-else
                      @keyup.enter="register(mutate)"
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
                      @click="register(mutate)"
                      >Register</v-btn
                    >
                  </v-col>
                </v-row>
              </template>
            </ApolloMutation>
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
    register(mutate) {
      // Check username length
      if (this.inputUsername.length < 4) {
        this.$store.commit('showSnackbar', {
          text: 'Username must have at least 4 characters',
        });
        return;
      }

      // Check if username is taken
      this.$apollo
        .query({
          query: require('@/graphql/users/GetUser.gql'),
          variables: { name: this.inputUsername },
        })
        .then(({ data }) => {
          if (data.User.length > 0) {
            this.$store.commit('showSnackbar', {
              text: 'This username is already taken',
            });
          }
          // Register
          else {
            mutate();
          }
        });
    },

    onDone({ data }) {
      this.$store.commit('setUser', {
        isLoggedIn: true,
        name: data.CreateUser.name,
        id: data.CreateUser.userId,
      });
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped>
.register-container {
  height: calc(100vh - 56px);
  background-color: #f0e3ce;
}
</style>
