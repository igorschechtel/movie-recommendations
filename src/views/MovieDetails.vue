<template>
  <v-container>
    <v-row v-if="movie">
      <v-col>
        <v-card>
          <v-container class="px-8">
            <v-row>
              <v-col>
                <h1 class="grey-text text--darken-3" style="font-size: 3rem;">
                  {{ movie.title }}
                </h1>
                <h3 class="secondary--text text--darken-3">
                  {{ movie.year }}
                </h3>

                <p class="mt-6" style="font-size: 1.2rem">{{ movie.plot }}</p>

                <template v-if="movie.runtime">
                  <h4 class="primary--text mt-6">Runtime</h4>
                  <span>{{ movie.runtime + ' min' }}</span>
                </template>

                <template v-if="movie.released">
                  <h4 class="primary--text mt-2">Release date</h4>
                  <span>{{ movie.released }}</span>
                </template>

                <template v-if="movie.budget">
                  <h4 class="primary--text mt-2">Budget</h4>
                  <span>{{
                    movie.budget.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                  }}</span>
                </template>

                <template v-if="movie.revenue">
                  <h4 class="primary--text mt-2">Revenue</h4>
                  <span>{{
                    movie.revenue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                  }}</span>
                </template>

                <template v-if="movie.imdbRating">
                  <h4 class="primary--text mt-2">IMDB Rating</h4>
                  <span>{{ movie.imdbRating + '/10' }}</span>
                </template>

                <template v-if="movie.countries && movie.countries.length > 0">
                  <h4 class="primary--text mt-2">Countries</h4>
                  <span>{{ movie.countries.join(', ') }}</span>
                </template>
              </v-col>

              <v-col cols="auto">
                <v-img
                  style="border-radius: 5px"
                  contain
                  width="350px"
                  :aspect-ratio="2 / 3"
                  :src="movie.poster"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <h1 class="primary--text mt-8 mb-8">Similar Movies</h1>

        <v-slide-group
          show-arrows="desktop"
          v-if="movie.similarMovies.length > 0"
        >
          <v-slide-item
            v-for="movie in movie.similarMovies"
            :key="movie.movieId"
          >
            <MovieCard :movie="movie" />
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from '../components/MovieCard';

export default {
  data: () => ({
    movie: undefined,
  }),

  components: {
    MovieCard,
  },

  watch: {
    '$route.params.id'() {
      this.fetchMovieDetails();
    },
  },

  created() {
    this.fetchMovieDetails();
  },

  methods: {
    fetchMovieDetails() {
      const id = this.$route.params.id;

      this.$apollo
        .query({
          query: require('@/graphql/movies/MovieDetails.gql'),
          variables: { id },
        })
        .then(({ data }) => {
          this.movie = data.Movie[0];
        });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
