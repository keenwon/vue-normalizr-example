import Vue from 'vue';
import Vuex from 'vuex';

import news from './modules/news';
import comment from './modules/comment';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    news,
    comment
  }
});

export default store;