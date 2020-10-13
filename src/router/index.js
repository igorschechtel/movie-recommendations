import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Register from '../views/Register.vue';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import EditProfile from '../views/EditProfile.vue';
import MovieDetails from '../views/MovieDetails.vue';
import SearchResults from '../views/SearchResults.vue';
import GenreResults from '../views/GenreResults.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    meta: { requiresAuth: true },
  },
  {
    path: '/genre/:genre',
    name: 'GenreResults',
    component: GenreResults,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.userIsLoggedIn) {
    next({
      path: '/signin',
    });
  } else next();
});

export default router;
