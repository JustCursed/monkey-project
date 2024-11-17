const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('find')
	.setDescription('find your watched anime')
	.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild)
	.addStringOption(option =>
		option.setName('name')
			.setDescription('anime name')
			.setRequired(true)
	)
	.addIntegerOption(opt =>
		opt.setName('page')
			.setDescription('page anime')
			.setMinValue(1)
	);

module.exports = {
	data: command,
	execute: async ctx => {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Your watched anime')
			.setAuthor({ name: 'Monkey team', url: 'https://github.com/JustCursed/monkey-project' })
			.setTimestamp();

		const aniList = await ctx.client.db.getByName(ctx.user.id, ctx.options.getString('name'), ctx.options.getInteger('page') ?? 1);
		aniList.forEach(anime => embed.addFields({ name: anime.name, value: new Date(anime.time).toISOString() }))

		await ctx.reply({ embeds: [embed], ephemeral: true });
	}
};
