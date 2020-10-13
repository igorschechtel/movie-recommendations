<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="grey--text text--darken-3">Edit Profile</h1>

        <v-text-field
          label="Username"
          class="mt-6"
          outlined
          v-model="inputUsername"
          :color="inputUsername.length >= 4 ? 'success' : 'error'"
        ></v-text-field>

        <v-btn @click="updateUsername" color="green" dark class="d-block mb-5"
          >Save change</v-btn
        >
        <v-btn @click="removeAccount" color="primary" dark
          >Remove my account</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    inputUsername: '',
  }),

  created() {
    this.inputUsername = this.$store.getters.userName;
  },

  methods: {
    updateUsername() {
      if (this.inputUsername.length < 4) {
        this.$store.commit('showSnackbar', {
          bgColor: 'error',
          text: 'Username must have at least 4 characters',
        });
        return;
      }

      this.$apollo
        .mutate({
          mutation: require('@/graphql/users/UpdateUser.gql'),
          variables: {
            userId: this.$store.getters.userId,
            name: this.inputUsername,
          },
        })
        .then(({ data }) => {
          const { name, userId } = data.UpdateUser;
          this.$store.commit('setUser', { name, id: userId });
          this.$store.commit('showSnackbar', {
            bgColor: 'success',
            text: 'Username changed',
          });
        });
    },

    removeAccount() {
      this.$apollo
        .mutate({
          mutation: require('@/graphql/users/DeleteUser.gql'),
          variables: {
            userId: this.$store.getters.userId,
          },
        })
        .then(() => {
          this.$store.commit('showSnackbar', {
            bgColor: 'success',
            text: 'Account deleted',
          });
          setTimeout(() => {
            this.$router.go();
          }, 1000);
        });
    },
  },
};
</script>
