import { SlashCommandBuilder } from '@discordjs/builders';
const buttonCommand = new SlashCommandBuilder()
        .setName('button')
        .setDescription('Button command')

export default buttonCommand.toJSON();