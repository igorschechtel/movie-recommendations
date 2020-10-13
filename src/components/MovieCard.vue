<template>
  <v-card
    class="mx-4 py-0 d-flex flex-column justify-space-between"
    width="250px"
  >
    <!-- General info -->
    <v-container>
      <router-link
        style="text-decoration: none"
        :to="'/movie/' + movie.movieId"
      >
        <h3 class="grey--text text--darken-3">
          {{ movie.title }}
        </h3>
      </router-link>
      <span class="grey--text">{{ movie.year }}</span>
      <span v-if="movie.runtime" class="grey--text">{{
        ` ・ ${movie.runtime} min`
      }}</span>
    </v-container>

    <div>
      <!-- Image -->
      <router-link :to="'/movie/' + movie.movieId">
        <v-img
          contain
          width="250px"
          :aspect-ratio="2 / 3"
          :src="movie.poster"
        ></v-img
      ></router-link>

      <!-- Rating -->
      <Rating :imdbRating="movie.imdbRating" :movieId="movie.movieId" />
    </div>
  </v-card>
</template>

<script>
import Rating from '../components/Rating';

export default {
  props: ['movie'],

  components: {
    Rating,
  },
};
</script>
