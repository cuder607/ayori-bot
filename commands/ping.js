import { SlashCommandBuilder } from "@discordjs/builders";
const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get your ping!")
export default command.toJSON();
