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
    newsList = [
      {
        id: 201710260001,
        title: 'news 1',
        content: 'news content 1'
      },
      {
        id: 201710260002,
        title: 'news 2',
        content: 'news content 2'
      }
    ]
  }
</script>

