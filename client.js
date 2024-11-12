const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { readdir } = require('fs/promises');
const intent = GatewayIntentBits;
const commandsDir = './commands';
// const rest = new REST({ version: '10' }).setToken('');
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

(async () => {
	const commands = (await readdir(commandsDir))
		.map(filename => filename.slice(0, -3));

	for (const command of commands)
		client.commands.set(command, require(`${commandsDir}/${command}.js`));

	// await rest.put(
	// 	Routes.applicationGuildCommands('822915321459245097', '905193118419283979'),
	// 	{ body: [...client.commands.values()] },
	// );
})();

module.exports = client;

