<template>
  <v-container>
    <template v-if="loading">
      <Loading />
    </template>
    <v-row v-else-if="movie">
      <v-col>
        <v-card>
          <v-container class="px-8">
            <v-row>
              <v-col>
                <h1 style="font-size: 2.5rem;">
                  {{ movie.title }}
                </h1>
                <h3 class="secondary--text text--darken-4">
                  {{ movie.year }}
                </h3>

                <v-btn
                  :to="'/genre/' + genre.name"
                  x-small
                  class="mr-2 mt-3 grey--text text--darken-3"
                  color="secondary"
                  v-for="genre in movie.in_genre"
                  :key="genre.name"
                  >{{ genre.name }}</v-btn
                >

                <p class="mt-6" style="font-size: 1.2rem">{{ movie.plot }}</p>

                <v-row no-gutters>
                  <v-col cols="6" v-if="movie.runtime">
                    <h4 class="primary--text mt-2">Runtime</h4>
                    <span>{{ movie.runtime + " min" }}</span>
                  </v-col>

                  <v-col cols="6" v-if="movie.released">
                    <h4 class="primary--text mt-2">Release date</h4>
                    <span>{{ movie.released }}</span>
                  </v-col>

                  <v-col cols="6" v-if="movie.budget">
                    <h4 class="primary--text mt-2">Budget</h4>
                    <span>{{
                      movie.budget.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })
                    }}</span>
                  </v-col>

                  <v-col cols="6" v-if="movie.revenue">
                    <h4 class="primary--text mt-2">Revenue</h4>
                    <span>{{
                      movie.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })
                    }}</span>
                  </v-col>

                  <v-col cols="6" v-if="movie.imdbRating">
                    <h4 class="primary--text mt-2">IMDB Rating</h4>
                    <span>{{ movie.imdbRating + "/10" }}</span>
                  </v-col>

                  <v-col
                    cols="6"
                    v-if="movie.countries && movie.countries.length > 0"
                  >
                    <h4 class="primary--text mt-2">Countries</h4>
                    <span>{{ movie.countries.join(", ") }}</span>
                  </v-col>
                </v-row>

                <Rating
                  class="mt-12"
                  :imdbRating="movie.imdbRating"
                  :movieId="movie.movieId"
                />
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
import MovieCard from "../components/MovieCard";
import Rating from "../components/Rating";
import Loading from "../components/Loading";

export default {
  data: () => ({
    movie: undefined,
    loading: false
  }),

  components: {
    MovieCard,
    Rating,
    Loading
  },

  watch: {
    "$route.params.id"() {
      this.fetchMovieDetails();
    }
  },

  created() {
    this.fetchMovieDetails();
  },

  methods: {
    fetchMovieDetails() {
      this.loading = true;
      window.scrollTo(0, 0);

      const id = this.$route.params.id;

      this.$apollo
        .query({
          query: require("@/graphql/movies/MovieDetails.gql"),
          variables: { id }
        })
        .then(({ data }) => {
          this.movie = data.Movie[0];
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
