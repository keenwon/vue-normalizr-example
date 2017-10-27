<template>
  <NewsContent :news="news" />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NewsContent from '../components/NewsContent';

  import store from '../store';

  import { INews } from '../types';

  @Component({
    components: {
      NewsContent
    }
  })
  export default class NewsContentView extends Vue {
    get news(): INews {
      return (<any>store.state).news.currentNews;
    }

    get newsId(): number {
      return +this.$route.params.newsId;
    }

    created() {
      store.dispatch('getNews', this.newsId);
    }
  }
</script>

