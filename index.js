const { Events } = require('discord.js');
const client = require('./client.js');

client.once(Events.ClientReady, ctx => {
	console.log(`Logged in as ${ctx.user.tag}!`);
});

client.on(Events.InteractionCreate, async ctx => {
	const commandName = ctx.commandName;
	const command = ctx.client.commands.get(commandName);

	if (!ctx.isChatInputCommand() || !command) return;

	try {
		await command.execute(ctx);
	} catch (err) {
		ctx.replay({ content: 'Соррян, произошла ошибка', ephemeral: true });
	}
});

client.on(Events.MessageCreate, async ctx => {
	const commandName = ctx.content.split(' ')[0].slice(1);
	const command = ctx.client.commands.get(commandName);
	if (!ctx.content.startsWith('!') || !command) return;

	await command.run.execute(ctx);
})

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
