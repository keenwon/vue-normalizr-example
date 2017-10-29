<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <router-link :to="'/news/' + item.id">{{item.title}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { INews } from '@/types';

  @Component
  export default class NewsList extends Vue {
    @Prop()
    list: Array<INews>
  }
</script>
