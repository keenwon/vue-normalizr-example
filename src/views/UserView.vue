<template>
  <div>
    <router-link to="/"><< back</router-link>
    <User :user="user" :update="update" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import User from '../components/User';

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
    return this.$store.getters['user/item'](this.userId);
  }

  created(): void {
    this.userId = +this.$route.params.userId;

    this.$store.dispatch('user/getItem', this.userId);
  }

  update(user: IUser): void {
    this.$store.dispatch('user/update', user);
  }
}
</script>

