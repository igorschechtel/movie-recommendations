<template>
  <v-container>
    <v-row>
      <v-col>
        <ApolloQuery :query="require('@/graphql/GetMovies.gql')">
          <template v-slot="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Carregando...</div>
            <div v-else-if="error" class="error apollo">Um erro ocorreu :(</div>
            <div v-else-if="data" class="result apollo">
              <ul>
                <li v-for="movie in data.Movie" :key="movie.title">
                  {{ movie.title }}
                </li>
              </ul>
            </div>
            <div v-else class="no-result apollo">
              Nenhuma informação encontrada :(
            </div>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
