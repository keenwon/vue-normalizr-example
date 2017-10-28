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
    meta: {
      title: 'News List'
    },
    component: NewsListView
  },
  {
    path: '/news/:newsId',
    meta: {
      title: 'News Detail'
    },
    component: NewsContentView
  },
  {
    path: '/user/:userId',
    meta: {
      title: 'User'
    },
    component: UserView
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes
});

const originalTitle: string = document.title;

/**
 * 通用的页面 title 逻辑
 */
router.afterEach((to: Route) => {
  document.title = to.meta.title
    ? `${to.meta.title} - ${originalTitle}`
    : originalTitle;
});

export default router;
