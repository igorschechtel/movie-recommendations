<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="primary--text mb-6">Search results for '{{ query }}'</h1>

        <v-slide-group
          show-arrows="desktop"
          v-if="results && results.length > 0"
        >
          <v-slide-item v-for="movie in results" :key="movie.movieId">
            <MovieCard :movie="movie" />
          </v-slide-item>
        </v-slide-group>
        <p class="grey--text text--darken-1" v-else>
          Sorry, we didn't find any movie containing '{{ query }}'.
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
    query: undefined,
    results: undefined,
  }),

  watch: {
    '$route.query.query'() {
      this.getResults();
    },
  },

  created() {
    this.getResults();
  },

  methods: {
    getResults() {
      this.query = this.$route.query.query;
      this.result = undefined;

      this.$apollo
        .query({
          query: require('@/graphql/movies/SearchResults.gql'),
          variables: {
            query: this.query,
          },
        })
        .then(({ data }) => (this.results = data.Movie));
    },
  },
};
</script>
