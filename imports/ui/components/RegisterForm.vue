<template>
    <form class="login-form" @submit.prevent="handleSubmit">
    <div>
        <h2>Register a new Player</h2>
      <label for="username">Username</label>
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
      <label for="password">Password</label>
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
      <button type="submit">Register</button>
    </div>
    </form>
</template>


<script>
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(event) {
        // Meteor.call('users.register', this.username, this.password);

        const regSucess = Accounts.createUser({
          username: this.username,
          password: this.password
        });

        console.log(regSucess);
    }
  },
}
</script>