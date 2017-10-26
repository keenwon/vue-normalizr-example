import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
import App from './views/App.vue';

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});