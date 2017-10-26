import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';

import NewsListView from './views/NewsListView.vue';
import NewsContentView from './views/NewsContentView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: NewsListView
  },
  {
    path: '/news/:newsId',
    component: NewsContentView
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes
});

export default router;
