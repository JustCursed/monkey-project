const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('list')
	.setDescription('your anime list');

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Your wached anime')
	.setAuthor({ name: 'Monkey team', url: 'https://github.com/JustCursed/monkey-project' })
	.setTimestamp();

exports.run = {
	data: command,
	execute: async ctx => {
		ctx.channel.send({ embeds: [embed] });
	}
};

