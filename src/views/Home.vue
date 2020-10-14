<template>
  <v-container class="pt-4 pb-16">
    <!-- Top picks -->
    <v-row>
      <v-col class="d-flex align-center">
        <h2 class="font-weight-bold primary--text mr-5" style="font-size: 3rem">
          top picks
        </h2>
        <!-- <v-btn
          small
          depressed
          tile
          color="secondary"
          style="color: #444; border: 1px solid #ddd !important; transform: translateY(5px)"
          >see more</v-btn
        > -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ApolloQuery
          :query="require('@/graphql/movies/Recommended.gql')"
          :variables="{ userId }"
        >
          <template v-slot="{ result: { loading, error, data } }">
            <template v-if="loading">
              <Loading />
            </template>
            <div v-else-if="error" class="error apollo">
              An error occurred :(
            </div>
            <template v-else-if="data">
              <v-slide-group
                show-arrows="desktop"
                v-if="data.User[0].recommendedMovies.length > 0"
              >
                <v-slide-item
                  v-for="movie in data.User[0].recommendedMovies"
                  :key="movie.movieId"
                >
                  <MovieCard :movie="movie" />
                </v-slide-item>
              </v-slide-group>
              <p class="grey--text text--darken-1" v-else>
                We don't have enough data to make you recommendations. Keep
                rating movies and we'll show you some personalized
                recommendations when possible.
              </p>
            </template>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>

    <v-divider class="mb-4 mt-8"></v-divider>

    <!-- Recent releases -->
    <v-row>
      <v-col class="d-flex align-center">
        <h2
          class="font-weight-bold primary--text d-inline-block mr-5"
          style="font-size: 3rem"
        >
          recent releases
        </h2>
        <!-- <v-btn
          small
          depressed
          tile
          color="secondary"
          style="color: #444; border: 1px solid #ddd !important; transform: translateY(5px)"
          >see more</v-btn
        > -->
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <ApolloQuery :query="require('@/graphql/movies/RecentReleases.gql')">
          <template v-slot="{ result: { loading, error, data } }">
            <template v-if="loading">
              <Loading />
            </template>

            <div v-else-if="error" class="error apollo">
              An error occurred :(
            </div>

            <v-slide-group show-arrows="desktop" v-else-if="data">
              <v-slide-item v-for="movie in data.Movie" :key="movie.movieId">
                <MovieCard :movie="movie" />
              </v-slide-item>
            </v-slide-group>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

export default {
  components: {
    MovieCard,
    Loading
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  }
};
</script>
