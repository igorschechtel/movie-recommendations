<template>
  <v-container>
    <!-- Top picks -->
    <v-row>
      <v-col class="d-flex align-center">
        <h2 class="font-weight-bold primary--text mr-5" style="font-size: 3rem">
          top picks
        </h2>
        <v-btn
          small
          depressed
          tile
          color="secondary"
          style="color: #444; border: 1px solid #ddd !important; transform: translateY(5px)"
          >see more</v-btn
        >
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- Recent releases -->
    <v-row>
      <v-col class="d-flex align-center">
        <h2
          class="font-weight-bold primary--text d-inline-block mr-5"
          style="font-size: 3rem"
        >
          recent releases
        </h2>
        <v-btn
          small
          depressed
          tile
          color="secondary"
          style="color: #444; border: 1px solid #ddd !important; transform: translateY(5px)"
          >see more</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ApolloQuery :query="require('@/graphql/GetMovies.gql')">
          <template v-slot="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Carregando...</div>
            <div v-else-if="error" class="error apollo">Um erro ocorreu :(</div>
            <v-slide-group show-arrows="desktop" cols="auto" v-else-if="data">
              <v-slide-item v-for="movie in data.Movie" :key="movie._id">
                <v-card class="mx-4">
                  <v-card-title>{{ movie.title }}</v-card-title>

                  <div>
                    <v-img
                      contain
                      width="200px"
                      :aspect-ratio="2 / 3"
                      :src="movie.poster"
                    ></v-img>
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
