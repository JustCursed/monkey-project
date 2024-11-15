const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('list')
	.setDescription('your anime list')
	.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild)
	.addIntegerOption(option =>
		option.setName('number')
			.setDescription('Number of list')
			.setMinValue(1)
	);

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Your wached anime')
	.setAuthor({ name: 'Monkey team', url: 'https://github.com/JustCursed/monkey-project' })
	.setTimestamp();

module.exports = {
	data: command,
	execute: async ctx => {
		// await ctx.reply({ embeds: [embed] });
		console.log(ctx)
		await ctx.reply('dawdw')
	}
};

