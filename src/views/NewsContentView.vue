<template>
  <NewsContent :news="news" :commentList="commentList" />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import NewsContent from '../components/NewsContent';
  import store from '../store';
  import { INews, IComment } from '../types';

  @Component({
    components: {
      NewsContent
    }
  })
  export default class NewsContentView extends Vue {
    newsId: number;

    get news(): INews {
      return store.state.news.currentNews;
    }

    get commentList(): Array<IComment> {
      return store.state.comment.obj[this.newsId] || [];
    }

    created() {
      this.newsId = +this.$route.params.newsId;

      store.dispatch('getNews', this.newsId);
      store.dispatch('getCommentList', this.newsId);
    }
  }
</script>

