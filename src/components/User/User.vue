<template>
  <div v-if="user">
    <p>id: {{user.id}}</p>
    <p v-show="!isEdit">
      name: {{user.name}}
      <button @click="edit">edit</button>
    </p>
    <p v-show="isEdit">
      name: 
      <input v-model="user.name" @keyup.enter="save"/>
      <button @click="save">save</button>
    </p>
    <p>email: {{user.email}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { IUser } from '@/types';

  @Component
  export default class NewsList extends Vue {
    @Prop()
    user: IUser;

    @Prop()
    update: (user: IUser) => void;

    isEdit: boolean = false;

    edit() {
      this.isEdit = true;
    }

    save() {
      this.isEdit = false;
      this.update(this.user);
    }
  }
</script>

