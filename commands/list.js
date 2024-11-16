const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('list')
    .setDescription('your anime list')
	.addIntegerOption(option =>
		option.setName("page")
		.setDescription("Page number to view your anime")
	);

module.exports = {
    data: command,
    execute: async ctx => {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Your wached anime')
			.setAuthor({ name: 'Monkey team', url: 'https://github.com/JustCursed/monkey-project' })
			.setThumbnail(ctx.user.avatarURL())
			.setTimestamp();	

		const userId = ctx.user.id;
		const page = ctx.options.getInteger('page') ?? 1;
		const aniList = await ctx.client.db.getAniList(userId, page);
		aniList.forEach(anime => embed.addFields({ name: anime.name, value: new Date(anime.time).toISOString() }) );
        ctx.reply({ embeds: [embed], ephemeral: true });
    }
};
