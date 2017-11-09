import Vue from 'vue';
import Vuex from './vuex';

import normalizrPluginCreator from './plugins/normalizr';
import schemas from './schema';
import { install as fetchInstall } from './fetch';

import news from './modules/news';
import comment from './modules/comment';
import user from './modules/user';

Vue.use(Vuex);

const normalizrPlugin = normalizrPluginCreator(schemas);

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

/**
 * install fetch
 */
fetchInstall(store);

export default store;