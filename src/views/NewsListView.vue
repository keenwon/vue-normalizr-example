<template>
  <NewsList :list="newsList" />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NewsList from '../components/NewsList';

  @Component({
    components: {
      NewsList
    }
  })
  export default class NewsListView extends Vue {
    get newsList() {
      return this.$store.getters['news/list'];
    }

    created() {
      this.$store.dispatch('news/getList');
    }
  }
</script>

