import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord.js';
const command = new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Schedule a message')
        .addStringOption(option => 
            option
                .setName('message')
                .setDescription('The message to scheduled')
                .setMinLength(10)
                .setMaxLength(2000)
                .setRequired(true)
            )
        .addIntegerOption(option => 
            option
                .setName('time')
                .setDescription('The time to scheduled')
                .setRequired(true)
                .addChoices(
                    {name: '15 seconds', value: 15000},
                    {name: '1 minutes', value: 60000},
                    {name: '15 minutes', value:900000},
                    {name: '30 minutes', value: 1800000},
                    {name: '1 hour', value: 3600000}
                )
            )
        .addChannelOption(option => 
            option
                .setName('channel')
                .setDescription('The channel to scheduled')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )

export default command.toJSON();