import { SlashCommandBuilder } from "@discordjs/builders";
const banCommand = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Bans a user from the guild")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("temp")
      .setDescription("Temporary bans a user")
      .addUserOption((option) =>
        option.setName("user").setDescription("user to be banned")
      )
  );

export default banCommand.toJSON();
