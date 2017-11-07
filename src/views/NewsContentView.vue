<template>
  <div>
    <router-link to="/"><< back</router-link>
    <NewsContent :news="news" :commentList="commentList" :del="commentDel"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import NewsContent from '../components/NewsContent';

  import { INews, IComment } from '../types';

  @Component({
    components: {
      NewsContent
    }
  })
  export default class NewsContentView extends Vue {
    newsId: number;

    get news(): INews {
      return this.$store.getters['news/item'](this.newsId);
    }

    get commentList(): Array<IComment> {
      return this.$store.getters['comment/list'](this.newsId);
    }

    created() {
      this.newsId = +this.$route.params.newsId;

      this.$store.dispatch('news/getItem', this.newsId);
      this.$store.dispatch('comment/getList', this.newsId);
    }

    commentDel(commentId: number) {
      this.$store.dispatch('comment/delete', {
        newsId: this.newsId,
        commentId
      });
    }
  }
</script>

