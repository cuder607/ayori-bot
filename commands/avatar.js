import { SlashCommandBuilder } from "@discordjs/builders";
const command = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get avatar of user")
    .addUserOption(option => 
        option
            .setName('user')
            .setDescription('Choose user')
        )
export default command.toJSON();
