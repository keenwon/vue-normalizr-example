<template>
  <NewsList :list="newsList" />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NewsList from '../components/NewsList';

  import store from '../store';

  @Component({
    components: {
      NewsList
    }
  })
  export default class NewsListView extends Vue {
    get newsList() {
      return (<any>store.state).news || [];
    }

    created() {
      setTimeout(() => {
        store.dispatch('getNewsList');
      }, 2000)
    }
  }
</script>

