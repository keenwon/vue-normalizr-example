import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';

import NewsListView from './views/NewsListView.vue';
import NewsContentView from './views/NewsContentView.vue';
import UserView from './views/UserView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    alias: '/news',
    component: NewsListView
  },
  {
    path: '/news/:newsId',
    component: NewsContentView
  },
  {
    path: '/user/:userId',
    component: UserView
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes
});

export default router;
