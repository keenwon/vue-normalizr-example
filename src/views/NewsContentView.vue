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
      return store.getters['news/item'](this.newsId);
    }

    get commentList(): Array<IComment> {
      return store.getters['comment/list'](this.newsId);
    }

    created() {
      this.newsId = +this.$route.params.newsId;

      store.dispatch('news/getItem', this.newsId);
      store.dispatch('comment/getList', this.newsId);
    }
  }
</script>

