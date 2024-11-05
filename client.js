const { Client, GatewayIntentBits } = require('discord.js');
const intent = GatewayIntentBits;
const client = new Client({
	intents: [
		intent.Guilds,
		intent.GuildBans,
		intent.GuildMessages,
		intent.MessageContent,
		intent.DirectMessages,
	],
});

exports.client = client;
