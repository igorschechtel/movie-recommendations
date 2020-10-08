import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#e15c64',
        secondary: '#f0e3ce',
        accent: '#f7b26a',
      },
    },
  },
});
