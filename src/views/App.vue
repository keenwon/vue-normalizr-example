<template>
  <div>
    <p>Count: {{count}}</p>
    <button @click="onClick">+1</button>
  </div>
</template>

<script>
import Vue from 'vue';
import store from '../store';

export default {
  computed: {
    count() {
      return store.state.count;
    }
  },

  methods: {
    onClick() {
      store.commit('increment');
    }
  }
};
</script>

