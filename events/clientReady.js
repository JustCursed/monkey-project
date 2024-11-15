const { Events } = require("discord.js");

const listener = async ctx => {
	console.log(`Logged in as ${ctx.user.tag}!`);
};

module.exports = async client => client.once(Events.ClientReady, listener);
