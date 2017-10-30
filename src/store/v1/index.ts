import Vue from 'vue';
import Vuex from 'vuex';

import normalizrPlugin from './plugins/normalizr';

import news from './modules/news';
import comment from './modules/comment';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    news,
    comment,
    user
  },
  plugins: [
    normalizrPlugin
  ]
});

export default store;