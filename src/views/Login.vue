<template>
  <v-container class="login-container">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>
            Easy Login
          </v-card-title>

          <v-card-subtitle
            >Just type your name and you're ready to go</v-card-subtitle
          >

          <v-divider></v-divider>

          <v-container class="pa-4">
            <v-row>
              <v-col class="py-1">
                <v-text-field
                  placeholder="Your name"
                  v-model="inputUsername"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-center">
                <v-btn color="primary" @click="login">Login</v-btn>
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
    inputUsername: ""
  }),

  methods: {
    login() {
      if (this.inputUsername.length > 1) {
        this.$store.commit("setUsername", this.inputUsername);
        this.$router.push("/");
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