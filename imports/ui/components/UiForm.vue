<template>
    <div id="ui">
      <b-container>

        <!-- Game Status -->
        <b-row class="text-center mt-4">
            <h1 v-if="isInGame()">
              {{ getStatusText() }}
            </h1>

            <!-- Start Game Button -->
             <b-container v-else>
              <h1>Willkommen zu SSPES!</h1>
              <b-button size="lg" type="button" class="mt-4" variant="success" id="play-btn" @click="playButtonClicked">Join Game</b-button>
             </b-container>
        </b-row>

        <!-- Loading Spinner -->
        <div class="text-center" v-if = "getStatus() === 'waiting'">
          <b-spinner variant="success" type="grow"></b-spinner>
        </div>

        <!-- Action Buttons -->
        <!-- TODO: show only when getStatus() === Meteor.userID() -->
        <b-container v-if="isInGame()">
          <b-row class="text-center" align-v="center">
            <b-button-group size="lg" class="mt-4">
              <b-button type="button" id="Stein" @click="actionClicked">🪨</b-button>
              <b-button type="button" id="Papier" @click="actionClicked">📄</b-button>
              <b-button type="button" id="Schere" @click="actionClicked">✂️</b-button>
              <b-button type="button" id="Echse" @click="actionClicked">🦎</b-button>
              <b-button type="button" id="Spock" @click="actionClicked">🖖🏻</b-button>
            </b-button-group>
          </b-row>
        </b-container>

        <!-- Restart Button -->
        <b-container v-if="finish" class="m-4">
          <b-row>
            <h6>{{ getResultMessage() }}</h6>
          </b-row>
          <b-row>
              <b-button type="button" variant="success" id="reset-btn" @click="resetButtonClicked">Neu starten!</b-button>
          </b-row>
        </b-container>

        <!-- Game Data -->
        <div style="position: absolute; bottom: 5px;">
          <p> Game Data: {{ myGames }} </p>
        </div>
      </b-container>
    </div>
</template>


<script>
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Games } from "/lib/games";

export default {
  name: "UiForm",
  data() {
    return {
      username: "",
      password: "",
      finish: false,
      status: "",
      resultMessage: ""
    };
  },
  methods: {
    /**
     * Checks if the player is in a game
     * @returns {boolean|*} True if in a game, false if not
     */
    isInGame() {
      let inGame = Session.get("inGame");
      if (typeof inGame === "undefined") {
          return false;
      }
      return Session.get("inGame");
    },
    /**
     * Returns the result message
     * @returns {string} The result message
     */
    getResultMessage() {
      /**
       * Parses the result message code to a result message
       * @param resultMessageCode The result message code
       * @returns {string} The result message
       */
      function parseResultMessageCode(resultMessageCode) {
        let messageCodeSplit = resultMessageCode.split(";");
        let resultMessage = ""

        if (messageCodeSplit[0] === "Schere") {
          if (messageCodeSplit[1] === "Stein") {
            resultMessage = "Stein schleift Schere"
          }
          else if (messageCodeSplit[1] === "Spock") {
            resultMessage = "Spock zerschlägt Schere"
          }
          else if (messageCodeSplit[1] === "Papier") {
            resultMessage = "Schere schneidet Papier"
          }
          else if (messageCodeSplit[1] === "Echse") {
            resultMessage = "Schere schneidet Echse"
          }
        }
        else if (messageCodeSplit[0] === "Stein") {
          if (messageCodeSplit[1] === "Schere") {
            resultMessage = "Stein schleift Schere"
          }
          else if (messageCodeSplit[1] === "Spock") {
            resultMessage = "Spock vaporisiert Stein"
          }
          else if (messageCodeSplit[1] === "Papier") {
            resultMessage = "Papier umhüllt Stein"
          }
          else if (messageCodeSplit[1] === "Echse") {
            resultMessage = "Stein zerquetscht Echse"
          }
        }
        else if (messageCodeSplit[0] === "Papier") {
          if (messageCodeSplit[1] === "Stein") {
            resultMessage = "Papier umhüllt Stein"
          }
          else if (messageCodeSplit[1] === "Echse") {
            resultMessage = "Echse frisst Papier"
          }
          else if (messageCodeSplit[1] === "Schere") {
            resultMessage = "Schere schneidet Papier"
          }
          else if (messageCodeSplit[1] === "Spock") {
            resultMessage = "Papier entlässt Spock"
          }
        }
        else if (messageCodeSplit[0] === "Echse") {
          if (messageCodeSplit[1] === "Stein") {
            resultMessage = "Stein zerquetscht Echse"
          }
          else if (messageCodeSplit[1] === "Spock") {
            resultMessage = "Echse vergiftet Spock"
          }
          else if (messageCodeSplit[1] === "Papier") {
            resultMessage = "Echse frisst Papier"
          }
          else if (messageCodeSplit[1] === "Schere") {
            resultMessage = "Schere schneidet Echse"
          }
        }
        else if (messageCodeSplit[0] === "Spock") {
          if (messageCodeSplit[1] === "Stein") {
            resultMessage = "Spock vaporisiert Stein"
          }
          else if (messageCodeSplit[1] === "Schere") {
            resultMessage = "Spock zerschlägt Schere"
          }
          else if (messageCodeSplit[1] === "Papier") {
            resultMessage = "Papier entlässt Spock"
          }
          else if (messageCodeSplit[1] === "Echse") {
            resultMessage = "Echse vergiftet Spock"
          }
        }

        this.resultMessage = resultMessage;

        return resultMessage;
      }

      if (Session.get("inGame")) {
        let myGame = Games.findOne();
        let resultMessage = "";

        if (this.status === "Du gewinnst!") {
          resultMessage = parseResultMessageCode(myGame.resultMessageCode);
        }
        else if (this.status === "Du verlierst!") {
          resultMessage = parseResultMessageCode(myGame.resultMessageCode);
        }

        return resultMessage
      }
    },

     getStatus() {
        if (Session.get("inGame")) {
          let myGame = Games.findOne();
          return myGame.status
        }
      },

    /**
     * Returns the current status of the game
     * @returns {string} The status of the game
     */
    getStatusText() {
        if (Session.get("inGame")) {
            let myGame = Games.findOne();

            if(myGame.status === "waiting") {
              this.status = "Warten auf Gegner....";
            }
            else if(myGame.status === Meteor.userId()) {
              this.status = "Du bist am Zug!";
            }
            else if(myGame.status !== Meteor.userId() && myGame.status !== "end") {
              this.status = "Gegner ist am Zug!";
            }
            else if(myGame.result === Meteor.userId()) {
              this.finish = true
              this.status = "Du gewinnst!";
            }
            else if(myGame.status === "end" && myGame.result !== Meteor.userId() && myGame.result !== "tie") {
              this.finish = true
              this.status = "Du verlierst!";
            }
            else if(myGame.result === "tie") {
              this.finish = true
              this.status = "Unentschieden!";
            }
            else {
              this.status = "";
            }

            return this.status
        }
    },
    actionClicked(event) {
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