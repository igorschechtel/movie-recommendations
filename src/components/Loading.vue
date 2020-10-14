<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <div class="text-center">
        <img
            class="pulse-anim d-block mx-auto mb-8"
            src="@/assets/popcorn-icon.png"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pulse-anim {
    animation-name: pulse;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

@keyframes pulse {
    from {
        transform: scale(1);
    }
    50% {
        transform: scale(0.8);
    }
    to {
        transform: scale(1);
    }
}
</style>