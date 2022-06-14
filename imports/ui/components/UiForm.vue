<template name="ui">
    <div id="ui">
        <h2>Hallo</h2>

<!--         {{#if inGame}}
            <p id="status">
                Status: {{status}}
            </p>
        {{else}} -->
            <button type="button" id="play-btn" @click="playButtonClicked">Play</button>
        <!-- {{/if}} -->

        <div>
            <div class="selectableField">
                <button type="button"id="Stein" @click="rockClicked">Rock</button>
                <button type="button"id="Papier" @click="paperClicked">Paper</button>
                <button type="button"id="Schere" @click="scissorClicked">Scissor</button>
            </div>
        </div>
    </div>

</template>


<script>
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
export default {
  name: "UiForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    rockClicked() {
        alert("rockClicked");
    },
    paperClicked() {
        alert("paperClicked");
    },
    scissorClicked() {
        alert("scissorClicked");
    },
    playButtonClicked() {
        Meteor.call('games.play');
    },

    handleSubmit(event) {
        // Meteor.call('users.register', this.username, this.password);



        const regSucess = Accounts.createUser({
          username: this.username,
          password: this.password
        });


        console.log(regSucess);

//         Meteor.call('postForm', newUser, function(error, response) {
//     if (error) {
//         console.log('postForm: Error: ', error);
//     }
//     if (response) {
//         console.log('postForm: Response: ', response);
//     }
// });

        // const regSucess = Accounts.createUser(this.username, this.password);
        // console.log(regSucess);

        // const test = Accounts.createUser(this.username, this.password);
        // console.log("test");
      // Meteor.loginWithPassword(this.username, this.password);
    }
  },
}
</script>