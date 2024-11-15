const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { readdir } = require('fs/promises');
const { commandsDir, eventsDir, token } = require('./config.json');
const intent = GatewayIntentBits;
const rest = new REST({ version: '10' }).setToken(token);
const client = new Client({
	intents: [
		intent.Guilds,
		intent.GuildBans,
		intent.GuildMessages,
		intent.MessageContent,
		intent.DirectMessages,
	],
});

client.commands = new Collection;
client.db = {
	data: {},
	getList: num => 0 || 1 ? 0 : 10 * (num - 1),
	sliceResult: (list, num) => list.slice(this.getList(num), this.getList(num) + 10),
	getAniList: async (id, num) => this.sliceResult(this.db.data[id], num),
	getByName: async (id, name, num) =>
		this.sliceResult(this.db.data[id].filter(el => el.name.includes(name)), num),
	addAnime: async (id, link) => {
		this.db.data[id] = [...this.db.data[id], {
			name: link, // await (await fetch(`http://localhost/monkey/get/name`, { headers: { aniLink: link } })).text()
			time: new Date().getTime(),
			link: link,
		}];
	},
};

(async () => {
	const events = await readdir(eventsDir);
	const commands = (await readdir(commandsDir))
		.map(filename => filename.slice(0, -3));

	for (const event of events)
		await require(`${eventsDir}/${event}`)(client);

	for (const command of commands)
		client.commands.set(command, require(`${commandsDir}/${command}.js`));

	await rest.put(
		Routes.applicationGuildCommands('822915321459245097', '905193118419283979'),
		{ body: [...client.commands.map(cmd => cmd.data)] },
	);
})();

client.login(token);

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
