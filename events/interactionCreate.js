const { Events } = require("discord.js");

const listener = async ctx => {
	const commandName = ctx.commandName;
	const command = ctx.client.commands.get(commandName);

	if (!ctx.isChatInputCommand() || !command) return;

	try {
		await command.execute(ctx);
	} catch (err) {
		console.error(err);
		ctx.reply({ content: 'Соррян, произошла ошибка', ephemeral: true });
	}
};

module.exports = async client => client.on(Events.InteractionCreate, listener);
