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
	sliceResult(list, page) {
		return list.slice((page - 1) * 10, page * 10);
	},
	async getAniList(id, page) {
		return this.sliceResult(this.data[id] ?? [], page);
	},
	async getByName(id, name, page) {
		return this.sliceResult(this.data[id].filter(ani => ani.name.includes(name)), page);
	},
	async addAnime(id, link) {
		const name = (await (await fetch('http://195.208.172.233:8888/get/name', { headers: { aniLink: link } })).text()).slice(1, -1);
		if (name === 'not found') return false;

		this.data[id] = [...this.data[id] ?? [], {
			name: name,
			time: new Date().getTime(),
			link: link,
		}];

		return true;
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
