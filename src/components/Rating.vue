<template>
  <div class="rating text-center mt-4">
    <v-icon
      v-for="(n, index) in 5"
      :key="index"
      @mouseenter="hoveredRating = n"
      @mouseleave="hoveredRating = undefined"
      @click="addMovieRating(n)"
      class="star-icon"
      size="40"
      :color="
        imdbRating / 2 >= n && hoveredRating === undefined
          ? 'yellow lighten-1'
          : 'grey'
      "
      :style="{ color: hoveredRating >= n ? '#e15c64 !important' : '' }"
      >mdi-star</v-icon
    >
  </div>
</template>

<script>
export default {
  props: ['imdbRating', 'userRating', 'movieId'],

  data: () => ({
    hoveredRating: undefined,
  }),

  methods: {
    addMovieRating(rating) {
      this.$apollo
        .mutate({
          mutation: require('@/graphql/rating/AddUserRating.gql'),
          variables: {
            userId: this.$store.getters.userId,
            movieId: this.movieId,
            rating,
          },
        })
        .then(({ data }) => console.log(data));
    },
  },
};
</script>

<style scoped>
.star-icon:hover {
  cursor: pointer;
}
</style>
