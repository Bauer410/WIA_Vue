import { Meteor } from 'meteor/meteor';
import { Games } from "/lib/games";

Meteor.startup(() => {
  // delete all games at start
  Games.remove({});

});

Meteor.publish('Games', function gamesPublication() {
  return Games.find({});
});


Meteor.publish('myGames', function myGamePublication() {
	return Games.find({
		$or: [
			{ player1: this.userId },
			{ player2: this.userId }
		]
	})
});