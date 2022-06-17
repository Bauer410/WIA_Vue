import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";
// import "/lib/gameLogic";
import { Games } from "/lib/games";


const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  Games.remove({});
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

Meteor.publish('Games', function gamesPublication() {
	return Games.find({ status: "waiting" }, {
		fields: {
			"status": 1,
			"player1": 1,
			"player2": 1
		}
	});
});

Meteor.publish('MyGame', function myGamePublication() {
	return Games.find({
		$or: [
			{ player1: this.userId },
			{ player2: this.userId }
		]
	})
});

Meteor.publish('Games2', function publishGames() {
  return Games.find();
});