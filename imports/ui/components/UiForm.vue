<template>
    <div id="ui">
      <b-container fluid>
        <b-row>
          <b-col>
            <p v-if="isInGame()">

              Status: {{ getStatus() }}
              ResultMessage: {{ getResultMessage() }}
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

        <div v-if="isInGame()">
          <b-row>
            <b-col>
              <b-button type="button" id="Stein" @click="actionClicked">Stein</b-button>
            </b-col>
            <b-col>
              <b-button type="button" id="Papier" @click="actionClicked">Papier</b-button>
            </b-col>
            <b-col>
              <b-button type="button" id="Schere" @click="actionClicked">Schere</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button type="button" id="Echse" @click="actionClicked">Echse</b-button>
            </b-col>
            <b-col>
              <b-button type="button" id="Spock" @click="actionClicked">Spock</b-button>
            </b-col>
          </b-row>
        </div>

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
    /**
     * Returns the current status of the game
     * @returns {string} The status of the game
     */
    getStatus() {
        if (Session.get("inGame")) {
            let myGame = Games.findOne();

            if(myGame.status === "waiting") {
              this.status = "Suche nach Gegner....";
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