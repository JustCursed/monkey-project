const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('list')
	.setDescription('your anime list')
	.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild)
	.addIntegerOption(option =>
		option.setName('page')
			.setDescription('Page of list')
			.setMinValue(1)
	);

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Your watched anime')
	.setAuthor({ name: 'Monkey team', url: 'https://github.com/JustCursed/monkey-project' })
	.setTimestamp();

module.exports = {
	data: command,
	execute: async ctx => {
		// await ctx.reply({ embeds: [embed] });
		console.log(await ctx.client.db.getAniList(ctx.user.id, ctx.options.getInteger('page') ?? 1));
		await ctx.reply('dwad');
	}
};
