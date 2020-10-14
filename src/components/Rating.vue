<template>
  <div v-if="!loading" class="text-center mt-4">
    <template v-if="!userHasRated">
      <v-icon
        v-for="n in 5"
        :key="n"
        @mouseenter="hoveredRating = n"
        @mouseleave="hoveredRating = undefined"
        @click="addMovieRating(n)"
        class="cursor-pointer"
        size="40"
        :color="hoveredRating >= n ? 'primary' : 'secondary darken-3'"
      >
        {{ getNotRatedStarIcon(n) }}
      </v-icon>
    </template>

    <template v-else>
      <v-icon
        v-for="n in 5"
        :key="n"
        @mouseenter="hoveredRating = n"
        @mouseleave="hoveredRating = undefined"
        @click="updateMovieRating(n)"
        class="cursor-pointer"
        size="40"
        :color="getRatedStarColor(n)"
      >
        {{ getRatedStarIcon(n) }}
      </v-icon>
    </template>
  </div>
</template>

<script>
export default {
  props: ["imdbRating", "movieId"],

  data: () => ({
    loading: false,
    hoveredRating: undefined,
    userHasRated: false,
    userRating: undefined
  }),

  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  },

  created() {
    this.getUserRating();
  },

  methods: {
    async addMovieRating(rating) {
      await this.$apollo.mutate({
        mutation: require("@/graphql/rating/AddUserRating.gql"),
        variables: {
          userId: this.userId,
          movieId: this.movieId,
          rating
        }
      });
      this.userRating = rating;
      this.userHasRated = true;
      this.$store.commit("showSnackbar", {
        bgColor: "success",
        text: "Rating sent successfully"
      });
    },

    async updateMovieRating(rating) {
      await this.$apollo.mutate({
        mutation: require("@/graphql/rating/UpdateUserRating.gql"),
        variables: {
          userId: this.userId,
          movieId: this.movieId,
          rating
        }
      });
      this.userRating = rating;
      this.userHasRated = true;
      this.$store.commit("showSnackbar", {
        bgColor: "success",
        text: "Rating updated successfully"
      });
    },

    async getUserRating() {
      const { data } = await this.$apollo.query({
        query: require("@/graphql/rating/GetUserRating.gql"),
        variables: {
          userId: this.userId,
          movieId: this.movieId
        }
      });
      const ratings = data.User[0].RATED_rel;
      if (ratings.length === 0) {
        this.userHasRated = false;
      } else {
        this.userHasRated = true;
        this.userRating = ratings[0].rating;
      }
      this.loading = false;
    },

    getNotRatedStarIcon(n) {
      if (this.hoveredRating) {
        return this.hoveredRating >= n ? "mdi-star" : "mdi-star-outline";
      }
      if (this.imdbRating <= 2 * n - 1.5) return "mdi-star-outline";
      if (this.imdbRating > 2 * n - 0.5) return "mdi-star";
      return "mdi-star-half-full";
    },

    getRatedStarIcon(n) {
      if (this.hoveredRating) {
        return this.hoveredRating >= n ? "mdi-star" : "mdi-star-outline";
      }
      return this.userRating >= n ? "mdi-star" : "mdi-star-outline";
    },

    getRatedStarColor(n) {
      if (this.hoveredRating) {
        return this.hoveredRating >= n ? "primary" : "secondary darken-3";
      }
      return this.userRating >= n ? "primary" : "secondary darken-3";
    }
  }
};
</script>