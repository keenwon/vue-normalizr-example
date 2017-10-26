import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';

import AppView from './views/App.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: AppView
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes
});

export default router;
