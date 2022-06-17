import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Games } from "/lib/games";

Meteor.startup(() => {
  // delete all games at atart
  Games.remove({});

});

// Meteor.publish('Games', function gamesPublication() {
// 	return Games.find({ status: "waiting" }, {
// 		fields: {
// 			"status": "1",
// 			"player1": "1",
// 			"player2": "1"
// 		}
// 	});
// });

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