<template name="ui">
    <div id="ui">
        <h2>Hallo</h2>

        <div v-if=" inGameCheck() ">
          Now you see me
            <p id="status">
                Status: {{ status() }}
            </p>
        </div>
        <div v-else>
          <button type="button" id="play-btn" @click="playButtonClicked">Play</button>
        </div>


        <h5> Game Test: {{gameTest}} </h5>
        <h5> Game Test: {{ inGameCheck() }} </h5>


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
import { Session } from 'meteor/session';
import { Games } from "/lib/games";

export default {
  name: "UiForm",
  data() {
    return {
      username: "",
      password: "",
      inGame: false
    };
  },
  methods: {
    inGameCheck() {
            console.log(Session.get("inGame"));

            let inGame = Session.get("inGame");
            if (typeof inGame === "undefined") {
                return false;
            }
            return Session.get("inGame");
    },
    status() {
        if(Session.get("inGame")) {
            let myGame = Games.findOne();

            if(myGame.status === "waiting")
                return "Looking for an opponent...";
            else if(myGame.status === Meteor.userId())
                return "Your turn";
            else if(myGame.status !== Meteor.userId() && myGame.status !== "end")
                return "opponent's turn";
            else if(myGame.result === Meteor.userId())
                return "You won!";
            else if(myGame.status === "end" && myGame.result !== Meteor.userId() && myGame.result !== "tie")
                return "You lost!";
            else if(myGame.result === "tie")
                return "It's a tie";
            else
                return "";
        }
    },
    rockClicked(event) {
        console.log(event);
        Meteor.call("games.makeMove", event.target.id);
    },
    paperClicked(event) {
        Meteor.call("games.makeMove", event.target.id);
    },
    scissorClicked(event) {
        Meteor.call("games.makeMove", event.target.id);
    },
    playButtonClicked() {
        console.log("Clicked button");
        Session.set("inGame", true);
        Meteor.call("games.play");
        Meteor.subscribe('MyGame');
    },
  },
    meteor: {
    $subscribe: {
      'games': []
    },
    gameTest() {
      return Games.find({});
    }
}
}
</script>