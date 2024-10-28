const { Client, GatewayIntentBits } = require('discord.js');
const intent = GatewayIntentBits;
const client = new Client({
	intents: [
		intent.Guilds,
		intent.GuildBans,
		intent.GuildMessages,
		intent.MessageContent,
		intent.DirectMessages,
		intent.GuildVoiceStates
	],
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login('');

