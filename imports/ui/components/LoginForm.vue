<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div>
      <h2>Login</h2>
      <label for="username">Nutzername</label>
      <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          v-model="username"
      />
    </div>

    <div>
      <label for="password">Passwort</label>
      <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
      />
    </div>
    <div>
      <b-button type="submit">Einloggen</b-button>
    </div>
  </form>
</template>

<script>
import { Meteor } from 'meteor/meteor';
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(event) {

const username2 = Meteor.users;
        console.log(username2);

      Meteor.loginWithPassword(this.username, this.password);
    }
  },
}
</script>