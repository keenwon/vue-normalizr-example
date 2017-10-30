<template>
  <div>
    <router-link to="/"><< back</router-link>
    <User :user="user" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import User from '../components/User';
  import store from '../store';
  import { IUser } from '../types';

  @Component({
    components: {
      User
    }
  })
  export default class UserView extends Vue {
    userId: number;

    get user(): IUser {
      // 取 store 中的当前用户
      return store.getters['user/item'](this.userId);
    }

    created() {
      this.userId = +this.$route.params.userId;

      store.dispatch('user/getItem', this.userId);
    }
  }
</script>

