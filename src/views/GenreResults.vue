<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="primary--text mb-6">{{ genre }}</h1>

        <v-slide-group
          show-arrows="desktop"
          v-if="results && results.length > 0"
        >
          <v-slide-item v-for="movie in results" :key="movie.movieId">
            <MovieCard :movie="movie" />
          </v-slide-item>
        </v-slide-group>
        
        <p class="grey--text text--darken-1" v-else-if="results && results.length === 0">
          Sorry, we didn't find any movie on genre '{{ genre }}'.
        </p>

        
        <p class="grey--text text--darken-1" v-else>
          Loading
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from '../components/MovieCard';

export default {
  components: {
    MovieCard,
  },

  data: () => ({
    genre: undefined,
    results: undefined,
  }),

  watch: {
    '$route.params.genre'() {
      this.getResults();
    },
  },

  created() {
    this.getResults();
  },

  methods: {
    getResults() {
      this.genre = this.$route.params.genre;
      this.result = undefined;

      this.$apollo
        .query({
          query: require('@/graphql/movies/GenreResults.gql'),
          variables: {
            genre: this.genre,
          },
        })
        .then(({ data }) => (this.results = data.Movie));
    },
  },
};
</script>
