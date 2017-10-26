<template>
  <div>
    <p>title: {{news.title}}</p>
    <p>author: {{news.author.name}}<{{news.author.email}}></p>
    <br />
    <p>{{news.content}}</p>
    <a href="javascript:history.go(-1)">back</a>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { INews } from '../../types';

  @Component
  export default class NewsContent extends Vue {
    @Prop()
    news: INews
  }
</script>
