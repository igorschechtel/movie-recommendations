<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="primary--text mb-6">{{ genre }}</h1>

        <template v-if="loading">
          <Loading />
        </template>

        <v-slide-group
          show-arrows="desktop"
          v-else-if="results && results.length > 0"
        >
          <v-slide-item v-for="movie in results" :key="movie.movieId">
            <MovieCard :movie="movie" />
          </v-slide-item>
        </v-slide-group>
        
        <p class="grey--text text--darken-1" v-else>
          Sorry, we didn't find any movie on genre '{{ genre }}'.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

export default {
  components: {
    MovieCard,
    Loading
  },

  data: () => ({
    genre: undefined,
    results: undefined,
    loading: false,
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
      this.loading = true;
      this.genre = this.$route.params.genre;

      this.$apollo
        .query({
          query: require('@/graphql/movies/GenreResults.gql'),
          variables: {
            genre: this.genre,
          },
        })
        .then(({ data }) => {
          this.results = data.Movie
          
        this.loading = false;
      });
    },
  },
};
</script>