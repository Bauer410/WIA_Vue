<template name="ui">
    <div id="ui">
      <b-container fluid>
        <b-row>
          <b-col>
            <p v-if="isInGame()">

              Status: {{ getStatus() }}
            </p>
            <b-button v-else type="button" id="play-btn" @click="playButtonClicked">Play</b-button>
          </b-col>
          <b-col />
          <b-col />
        </b-row>
        <b-row>
          <b-col>
            <h5> Game Test: {{ myGames }} </h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h5> Game Test: {{ isInGame() }} </h5>
          </b-col>
        </b-row>



        <b-row class="selectableField" v-if="isInGame()">
          <b-col>
            <b-button type="button" id="Stein" @click="rockClicked">Rock</b-button>
          </b-col>
          <b-col>
            <b-button type="button" id="Papier" @click="paperClicked">Paper</b-button>
          </b-col>
          <b-col>
            <b-button type="button" id="Schere" @click="scissorClicked">Scissor</b-button>
          </b-col>
        </b-row>

        <b-row v-if="finish">
          <b-col>
            <b-button type="button" id="reset-btn" @click="resetButtonClicked">Clear game</b-button>
          </b-col>
        </b-row>
      </b-container>
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
      finish: false
    };
  },
  methods: {
    isInGame() {
      let inGame = Session.get("inGame");
      if (typeof inGame === "undefined") {
          return false;
      }
      return Session.get("inGame");
    },
    getStatus() {
        if (Session.get("inGame")) {
            let myGame = Games.findOne();

            if(myGame.status === "waiting") {
              return "Looking for an opponent...";
            }
            else if(myGame.status === Meteor.userId()) {
              return "Your turn";
            }
            else if(myGame.status !== Meteor.userId() && myGame.status !== "end") {
              return "opponent's turn";
            }
            else if(myGame.result === Meteor.userId()) {
              this.finish = true
              return "You won!";
            }
            else if(myGame.status === "end" && myGame.result !== Meteor.userId() && myGame.result !== "tie") {
              this.finish = true
              return "You lost!";
            }
            else if(myGame.result === "tie") {
              this.finish = true
              return "It's a tie";
            }
            else {
              return "";
            }
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
        this.finish = false;
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