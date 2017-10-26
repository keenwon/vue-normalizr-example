<template>
  <div>
    <p>Count: {{count}}</p>
    <button @click="onClick">+1</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import store from '../store';

  @Component
  export default class App extends Vue {
    get count() {
      return store.state.count;
    }

    onClick() {
      store.commit('increment');
    }
  }
</script>

