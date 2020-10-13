<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view />
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Snackbar from './components/Snackbar';

export default {
  name: 'App',

  components: {
    AppBar,
    Snackbar,
  },
};
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}
</style>
