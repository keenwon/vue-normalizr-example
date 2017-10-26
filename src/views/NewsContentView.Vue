<template>
  <NewsContent :news="news" />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NewsContent from '../components/NewsContent/Index.vue';

  import store from '../store';

  @Component({
    components: {
      NewsContent
    }
  })
  export default class NewsContentView extends Vue {
    news = {
      id: 201710260001,
      title: 'news 1',
      content: 'news content 1',
      author: {
        id: 1,
        name: 'zhang san',
        email: 'zhangsan@example.com'
      }
    }
  }
</script>

