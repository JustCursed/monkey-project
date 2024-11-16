const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('find')
	.setDescription('find your watched anime')
	.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild)
	.addStringOption(option =>
		option.setName('name')
			.setDescription('anime name')
	)
	.addIntegerOption(opt =>
		opt.setName('page')
			.setDescription('page anime')
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
		console.log(await ctx.client.db.getAniList(ctx.user.id, ctx.options.getInteger('number') ?? 1));
		await ctx.reply('dwad');
	}
};
