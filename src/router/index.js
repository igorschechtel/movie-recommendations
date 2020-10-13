import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Register from '../views/Register.vue';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';

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
