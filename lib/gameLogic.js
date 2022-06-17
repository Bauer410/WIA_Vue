import { Meteor } from 'meteor/meteor';
import { Games } from "./games";

class GameLogic {
	/**
	 * Creates a new RPS-Game
	 */
	newGame() {
		if (!this.userIsAlreadyPlaying()) {
			Games.insert({
				player1: Meteor.userId(),
				player2: "",
				actions: [],
				status: "waiting",
				result: ""
			})
		}
	}

	/**
	 * Checks if the user is already playing
	 * @returns {boolean}
	 */
	userIsAlreadyPlaying() {
		const game = Games.findOne( {
			$or: [
				{ player1: Meteor.userId() },
				{ player2: Meteor.userId() }
			]
		});

		return game !== undefined;
	}

	/**
	 * Join a game as player 2
	 * @param game The game to join
	 */
	joinGame(game) {
		if (game.player2 === "" && Meteor.userId() !== undefined) {
			Games.update(
				{
					_id: game._id
				},
				{
					$set: {
						"player2": Meteor.userId(),
						"status": game.player1
					}
				}
			);
		}
	}

	addNewAction(action) {
		Games.update(
			{
				status: Meteor.userId()
			},
			{
				$push: {
					actions: { playerID: Meteor.userId(), action: action }
				}
			}
		);
	}

	setGameResult(gameId, result) {
		Games.update(
			{_id: gameId},
			{
				$set: {
					"result": result,
					"status": "end"
				}
			}
		);
	}

	resetActions(gameId) {
		Games.update(
			{_id: gameId},
			{
				$set: {
					"actions": []
				}
			}
		);
	}

	resetRound() {
		let game = Games.findOne(
			{
				status: "end"
			}
		);
		if (typeof game === "undefined") {
                return;
            }
		let gameId = game._id;
		this.resetActions(gameId);
		this.updateTurn(game);
		Games.update(
			{_id: gameId},
			{
				$set: {
					"result": ""
				}
			}
		);
	}

	updateTurn(game) {
		let nextPlayer;

		if(game.player1 === Meteor.userId())
			nextPlayer = game.player2;
		else
			nextPlayer = game.player1;

		Games.update(
			{_id: game._id},
			{
				$set: {
					"status": nextPlayer
				}
			}
		);
	}

	/**
	 * schere, stein, papier
	 * @returns {boolean}
	 */
	checkIfGameWasWon() {
		const game = Games.findOne({
			status: Meteor.userId()
		});

		console.log(game.actions.length);

		if (game.actions.length < 2) {
			return false;
		}

		console.log("1");
		console.log(game);

		if (game.actions[0].action === game.actions[1].action) {
			return false;
		}

		console.log("2");

		if (game.actions[0].action === "Schere") {
			if (game.actions[1].action === "Stein") {
				return false;
			}
			else if (game.actions[1].action === "Papier") {
				return true;
			}
		}
		console.log("3");
		if (game.actions[0].action === "Stein") {
			if (game.actions[1].action === "Papier") {
				return false;
			}
			else if (game.actions[1].action === "Schere") {
				return true;
			}
		}
		console.log("4");
		if (game.actions[0].action === "Papier") {
			if (game.actions[1].action === "Schere") {
				return false;
			}

			else if (game.actions[1].action === "Stein") {
				return true;
			}
		}
	}
}


export const gameLogic = new GameLogic();