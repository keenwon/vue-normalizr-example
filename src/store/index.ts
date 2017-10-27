import Vue from 'vue';
import Vuex from 'vuex';

import news from './modules/news';
import newsList from './modules/newsList';
import comment from './modules/comment';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    news,
    newsList,
    comment,
    user
  }
});

export default store;