<template>
  <div class="app">
    <!--<header>
      <div className="app-bar">
        <div className="app-header">
          <h1>
            ✂️ - 🪨 - 📄 - 🦎 - 🖖🏻
          </h1>
        </div>
      </div>
    </header>-->
    <!--<b-container>
      <b-navbar variant="faded" type="dark">
        <b-navbar-brand>✂️ - 🪨 - 📄 - 🦎 - 🖖🏻</b-navbar-brand>
       
      </b-navbar>
    </b-container>-->
    <b-container>
      <div>
        <b-nav>
          <b-button class="m-2" type="button" pill id="rules-btn" href="https://www.youtube.com/watch?v=03QhVJcuVoY">Spielregeln</b-button>
          <b-nav-text class="m-2 mx-auto">✂️ - 🪨 - 📄 - 🦎 - 🖖🏻</b-nav-text>
          <b-button v-if="currentUser" pill variant="danger" v-on:click="logout" class="m-2" type="button" id="logout-btn">Logout {{currentUser.username}}</b-button>
        </b-nav>
      </div>
    </b-container>
    <div class="main">
      <template v-if="currentUser">
        <!---<div class="user" v-on:click="logout">
          {{currentUser.username}} 🚪
        </div>-->
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
