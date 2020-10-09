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

          <v-container fluid class="pa-4">
            <p v-if="$apollo.loading">Logging in...</p>
            <p v-else-if="$apollo.error">
              An error occurred: {{ $apollo.error }}
            </p>

            <template v-else>
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
            </template>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    inputUsername: ""
  }),

  methods: {
    login() {
      if (this.inputUsername.length > 1) {
        // this.$apollo.query
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  height: calc(100vh - 56px);
  background-color: #f0e3ce;
}
</style>
