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
				result: "",
				resultMessageCode: ""
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

	setResultMessageCode(gameId, resultMessageCode) {
		Games.update(
			{_id: gameId},
			{
				$set: {
					"resultMessageCode": resultMessageCode
				}
			}
		);
	}

	getWinner() {
		const game = Games.findOne({
			status: Meteor.userId()
		});

		let winner = "";
		let resultMessageCode;
		let firstAction = game.actions[0].action
		let secondAction = game.actions[1].action

		if (firstAction === "Schere") {
			if (secondAction === "Stein" || secondAction === "Spock") {
				winner = game.actions[1].playerID;
			}
			else if (secondAction === "Papier" || secondAction === "Echse") {
				winner =  game.actions[0].playerID;
			}
		}
		else if (firstAction === "Stein") {
			if (secondAction === "Papier" || secondAction === "Spock") {
				winner = game.actions[1].playerID;
			}
			else if (secondAction === "Schere" || secondAction === "Echse") {
				winner = game.actions[0].playerID;
			}
		}
		else if (firstAction === "Papier") {
			if (secondAction === "Schere" || secondAction === "Echse") {
				winner = game.actions[1].playerID;
			}

			else if (secondAction === "Stein" || secondAction === "Spock") {
				winner = game.actions[0].playerID;
			}
		}
		else if (firstAction === "Echse") {
			if (secondAction === "Schere" || secondAction === "Stein") {
				winner = game.actions[1].playerID;
			}
			else if (secondAction === "Spock" || secondAction === "Papier") {
				winner = game.actions[0].playerID;
			}
		}
		else if (firstAction === "Spock") {
			if (secondAction === "Schere" || secondAction === "Stein") {
				winner = game.actions[1].playerID;
			}
			else if (secondAction === "Echse" || secondAction === "Papier") {
				winner = game.actions[0].playerID;
			}
		}

		resultMessageCode = firstAction + ";" + secondAction;
		this.setResultMessageCode(game._id, resultMessageCode)

		return winner;
	}

	/**
	 * schere, stein, papier
	 * @returns {boolean}
	 */
	checkIfGameWasWon() {
		const game = Games.findOne({
			status: Meteor.userId()
		});

		return !(game.actions.length < 2 || game.actions[0].action === game.actions[1].action);
	}
}


export const gameLogic = new GameLogic();