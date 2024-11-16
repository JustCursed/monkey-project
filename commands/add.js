const { SlashCommandBuilder, InteractionContextType } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('add')
	.setDescription('add anime to your watched list')
	.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild)
	.addStringOption(option =>
		option.setName('link')
			.setDescription('link to site with anime')
			.setRequired(true)
	);

module.exports = {
	data: command,
	execute: async ctx => {
		await ctx.client.db.addAnime(ctx.user.id, ctx.options.getString('link'));
		await ctx.reply({ content: 'Аниме успешно добавлено в список просмотренных!', ephemeral: true });
	}
};
