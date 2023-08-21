import { SlashCommandBuilder } from '@discordjs/builders';
const channelsCommand = new SlashCommandBuilder()
        .setName('channels')
        .setDescription('Channel command')
        .addChannelOption(option => 
            option
                .setName('channels')
                .setDescription('channels')
                .setRequired(true)
            )
        .addBooleanOption(option => 
            option
                .setName('deletemsg')
                .setDescription('Delete all messages')
                .setRequired(true)
            )
        .addIntegerOption(option => 
            option 
                .setName('age')
                .setDescription('Enter your age')
            )
        .addAttachmentOption(option =>
            option 
                .setName('attachment')
                .setDescription('Upload your attachments')
            )

export default channelsCommand.toJSON();