<template>
  <div>
    <p>News List:</p>
    <ul>
      <li v-for="item in list" :key="item.id">
        <a :href="'/news/' + item.id">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { INews } from '../../types';

  @Component
  export default class NewsList extends Vue {
    @Prop()
    list: Array<INews>
  }
</script>
