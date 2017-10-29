<template>
  <div v-if="news">
    <p>title: {{news.title}}</p>
    <p>author: <router-link :to="'/user/' + news.author.id">{{news.author.name}}</router-link></p>
    <br />
    <p>{{news.content}}</p>
    <template v-if="hasComment">
      <br />
      <p>comments:</p>
      <ul>
        <li v-for="comment in commentList" :key="comment.id">
          <p>id: {{comment.id}}</p>
          <p>author: <router-link :to="'/user/' + comment.author.id">{{comment.author.name}}</router-link></p>
          <p>content: {{comment.content}}</p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { INews, IComment } from '@/types';

  @Component
  export default class NewsContent extends Vue {
    @Prop()
    news: INews;

    @Prop()
    commentList: Array<IComment>;

    get hasComment(): boolean {
      return this.commentList && this.commentList.length > 0;
    }
  }
</script>
