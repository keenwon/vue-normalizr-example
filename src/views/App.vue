<template>
  <div>
    <h2>Vue Normailzr Example</h2>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import store from '../store';

  @Component
  export default class App extends Vue {
  }
</script>

