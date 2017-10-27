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
      return store.state.news.list;
    }

    created() {
      store.dispatch('news/getList');
    }
  }
</script>

