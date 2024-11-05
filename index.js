const client = require('./client.js').client;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'list') {
		await require('./commands/list.js').run();
	}

	if (interaction.commandName === 'poslatb') {
		interaction.replay({ content: 'Secret Pong!', ephemeral: true });
	}
});

client.login('');

/*
let boxWithBeer = [1, 2, 3, 4, 5];

const dionis = {
	alkogol: 90,
	takeBeer: () => {
		boxWithBeer.pop();
	},
	giveBeer: (type, amount) => {
		if (type === 'craft') {
			console.log('пошёл нахуй моё');
			return;
		} else if (type === 'filter') {
			console.log('держи, друг мой! всё для тебя!');
		} else {
			console.log('я не знаю такого');
			return;
		}

		for (let i = 0; i < amount; i++) {
			this.takeBeer();
		}
	}
};

dionis.giveBeer('craft', 2);
dionis.giveBeer('filter', 5);

const tet = (type, amount) => {

};
*/
