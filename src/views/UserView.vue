<template>
  <User :user="user" />
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
      return store.state.user.obj[this.userId];
    }

    created() {
      this.userId = +this.$route.params.userId;

      store.dispatch('user/getItem', this.userId);
    }
  }
</script>

