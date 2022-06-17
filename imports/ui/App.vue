<template>
  <div class="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>
            📝️ Schere, Stein, Papier
          </h1>
        </div>
      </div>
    </header>
    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          {{currentUser.username}} 🚪
        </div>
        <UiForm />

      </template>
      <template v-else>
        <LoginForm />
        <RegisterForm />
      </template>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import Task from "./components/Task.vue";
// import TaskForm from "./components/TaskForm.vue";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UiForm from "./components/UiForm.vue";
import { Meteor } from "meteor/meteor";
export default {
  components: {
    LoginForm,
    RegisterForm,
    UiForm
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      Meteor.logout();
    }
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    }
  }
};
</script>
