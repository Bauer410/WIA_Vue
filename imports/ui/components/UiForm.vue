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


        <h5> Game Test: {{ myGames }} </h5>
        <h5> Game Test: {{ inGameCheck() }} </h5>


        <div>
            <div class="selectableField">
                <button type="button"id="Stein" @click="rockClicked">Rock</button>
                <button type="button"id="Papier" @click="paperClicked">Paper</button>
                <button type="button"id="Schere" @click="scissorClicked">Scissor</button>
            </div>
        </div>

        <div>
            <p></p>
            <button type="button" id="reset-btn" @click="resetButtonClicked">Clear game</button>
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
        Meteor.call("games.makeMove", event.target.id);
    },
    paperClicked(event) {
        Meteor.call("games.makeMove", event.target.id);
    },
    scissorClicked(event) {
        Meteor.call("games.makeMove", event.target.id);
    },
    playButtonClicked() {
        Session.set("inGame", true);
        Meteor.call("games.play");
        Meteor.subscribe("myGames");
    },
    resetButtonClicked() {
        console.log("Reset button clicked");
        Meteor.call("games.resetRound");
    },
  },
    meteor: {
    $subscribe: {
      // Subscribes to the 'myGames' publication with no parameters
      myGames: []
    },
    myGames() {
      return Games.find({}).fetch();
    },
}
}
</script>