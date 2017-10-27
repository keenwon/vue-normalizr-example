<template>
  <div v-if="user">
    <p>id: {{user.id}}</p>
    <p>name: {{user.name}}</p>
    <p>email: {{user.email}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { IUser } from '../../types';

  @Component
  export default class NewsList extends Vue {
    @Prop()
    user: IUser
  }
</script>

