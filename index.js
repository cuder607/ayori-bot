// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require('axios');

import {
  Client,
  GatewayIntentBits,
  ModalBuilder,
  REST,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  InteractionType,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import OrderCommand from "./commands/order.js";
import RoleCommand from "./commands/role.js";
import UserCommand from "./commands/user.js";
import ChannelCommand from "./commands/channel.js";
import BanCommand from "./commands/ban.js";
import RegisterCommand from "./commands/register.js";
import ButtonCommand from "./commands/button.js";
import ScheduleCommand from "./commands/schedule.js";
import AvatarCommand from "./commands/avatar.js";
import PingCommand from "./commands/ping.js";
import { config } from "dotenv";
import schedule from "node-schedule";
config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in successfully!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) {
    if (message.channel.id === '1143095475138990090' || message.channel.id === '1143102499461541898') {
      try {
        const res = await axios.get(`http://api.brainshop.ai/get?bid=177389&key=i5abbQMMTmreH9it&uid=1&msg=${message.content}`);
        message.channel.send(res.data.cnt);
      } catch (e) {
        message.channel.send('Bot lỗi, vui lòng thử lại sau!');
      }
    }
  };
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  switch(cmd) {
    case '()': 
      console.log(message);
      break;
    case 'ping':
      let msg = await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription("🎾 | Ping...")
            .setColor("#6F8FAF"),
        ],
      });
  
      let zap = "⚡";
      let green = "🟩";
      let red = "🟥";
      let yellow = "🟨";
  
      var botState = zap;
      var apiState = zap;
  
      let apiPing = client.ws.ping;
      let botPing = Math.floor(msg.createdAt - message.createdAt);
  
      if (apiPing >= 40 && apiPing < 200) {
        apiState = green;
      } else if (apiPing >= 200 && apiPing < 400) {
        apiState = yellow;
      } else if (apiPing >= 400) {
        apiState = red;
      }
  
      if (botPing >= 40 && botPing < 200) {
        botState = green;
      } else if (botPing >= 200 && botPing < 400) {
        botState = yellow;
      } else if (botPing >= 400) {
        botState = red;
      }
      msg.delete();
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🏓 | Pong!")
            .addFields(
              {
                name: "API Latency",
                value: `\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\``,
                inline: true,
              },
              {
                name: "Bot Latency",
                value: `\`\`\`yml\n${botState} | ${botPing}ms\`\`\``,
                inline: true,
              }
            )
            .setColor(Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0'))
            .setFooter({ text: `Request by ${message.author.username}`, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=4096` })
        ],
      });
      break;
    case '!@#$%^&*()':
      const embed = new EmbedBuilder()
      .setColor('D9EAD3')
      .setTitle('Info User')
      .setAuthor({ name: `${message.author.username}`, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=100`})
      .setDescription('Some description here')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: `${message.author.username}`, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=4096` });
      message.channel.send({ embeds: [embed] });
      break;
    case 'avatar': {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const avatarURL = member.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });
      const embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0'))
          .setTitle(`Click here to get link's avatar!`)
          .setURL(avatarURL)
          .setImage(avatarURL)
          .setTimestamp()
          .setFooter({ text: `Here is ${member.displayName}'s avatar`, iconURL: `${avatarURL}` });
      message.channel.send({ embeds: [embed] });
      break;
    }
    case 'c':
    case 'chat': {
      try {
        const res = await axios.get(`http://api.brainshop.ai/get?bid=177389&key=i5abbQMMTmreH9it&uid=1&msg=${args.join(' ')}`);
        message.channel.send(res.data.cnt);
        break;
      } catch (e) {
        message.channel.send('Bot lỗi, vui lòng thử lại sau!');
        break;
      }
      
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "order") {
      console.log("Order Command");
      console.log(interaction);
      const actionRowComponent = new ActionRowBuilder().setComponents(
        new SelectMenuBuilder().setCustomId("food_options").setOptions([
          { label: "Cake", value: "cake" },
          { label: "Pizza", value: "pizza" },
          { label: "Sushi", value: "sushi" },
        ])
      );
      const actionRowDrinkComponent = new ActionRowBuilder().setComponents(
        new SelectMenuBuilder().setCustomId("drink_options").setOptions([
          { label: "Coca Cola", value: "coca_cola" },
          { label: "Pepsi", value: "pepsi" },
        ])
      );
      interaction.reply({
        components: [
          actionRowComponent.toJSON(),
          actionRowDrinkComponent.toJSON(),
        ],
      });
    } else if (interaction.commandName === "register") {
      const modal = new ModalBuilder()
        .setTitle("Register User Form")
        .setCustomId("registerUserModal")
        .setComponents(
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("username")
              .setCustomId("username")
              .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("email")
              .setCustomId("email")
              .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("comment")
              .setCustomId("comment")
              .setStyle(TextInputStyle.Paragraph)
          )
        );

      interaction.showModal(modal);
    } else if (interaction.commandName === "button") {
      interaction.reply({
        content: "Button",
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("button1")
              .setLabel("Button 1")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setLabel("Button 2")
              .setStyle(ButtonStyle.Link)
              .setURL('https://www.youtube.com/')
              
          ),
        ],
      });
    } else if (interaction.commandName === "schedule") {
      const message = interaction.options.getString('message');
      const time = interaction.options.getInteger('time');
      const channel = interaction.options.getChannel('channel');

      const date = new Date(new Date().getTime() + time);
      interaction.reply({content: `Your message has been scheduled for ${date.toTimeString()}`})
      schedule.scheduleJob(date, () => {
        channel.send({content: message});
      })
    } else if (interaction.commandName === 'avatar') {
      const member = interaction.options.getUser('user') || interaction.user;
      const avatarURL = member.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });
      const embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0'))
          .setTitle(`Click here to get link's avatar!`)
          .setURL(avatarURL)
          .setImage(avatarURL)
          .setTimestamp()
          .setFooter({ text: `Here is ${member.displayName}'s avatar`, iconURL: `${avatarURL}` });
      interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === 'ping') {
      let msg = await interaction.channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription("🎾 | Ping...")
            .setColor("#6F8FAF"),
        ],
      });
  
      let zap = "⚡";
      let green = "🟩";
      let red = "🟥";
      let yellow = "🟨";
  
      var botState = zap;
      var apiState = zap;
  
      let apiPing = client.ws.ping;
      let botPing = Math.floor(msg.createdAt - interaction.createdAt);
  
      if (apiPing >= 40 && apiPing < 200) {
        apiState = green;
      } else if (apiPing >= 200 && apiPing < 400) {
        apiState = yellow;
      } else if (apiPing >= 400) {
        apiState = red;
      }
  
      if (botPing >= 40 && botPing < 200) {
        botState = green;
      } else if (botPing >= 200 && botPing < 400) {
        botState = yellow;
      } else if (botPing >= 400) {
        botState = red;
      }
      msg.delete();
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🏓 | Pong!")
            .addFields(
              {
                name: "API Latency",
                value: `\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\``,
                inline: true,
              },
              {
                name: "Bot Latency",
                value: `\`\`\`yml\n${botState} | ${botPing}ms\`\`\``,
                inline: true,
              }
            )
            .setColor(Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0'))
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=4096` })
        ],
      });
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId === "food_options") {
    } else if (interaction.customId === "drink_options") {
    }
  } else if (interaction.type === InteractionType.ModalSubmit) {
    console.log("register");
    if (interaction.customId === "registerUserModal") {
      interaction.reply({
        content: "You successfully submitted your details.",
      });
    }
  } else if (interaction.isButton()) { 
    console.log('Button interaction');
    interaction.reply({content: 'Thanks for clicking on the button'})
  } else if (interaction.isUserContextMenuCommand()) {
    if (interaction.commandName === 'Report') {
      interaction.reply({content: `You reported ${interaction.targetMember}`})
    } else if (interaction.commandName === 'Wave') {
      interaction.reply({content: `You waved to ${interaction.targetMember}`})
    }
  }
});

async function main() {
  // const commands = [
  //   OrderCommand,
  //   RoleCommand,
  //   UserCommand,
  //   ChannelCommand,
  //   BanCommand,
  //   RegisterCommand,
  //   ButtonCommand,
  //   ScheduleCommand,
  //   {
  //     name: 'Wave',
  //     type: 2
  //   },
  //   {
  //     name: 'Report',
  //     type: 2
  //   }
  // ];
  const commands = [
    AvatarCommand,
    PingCommand
  ];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    client.login(process.env.TOKEN);
  } catch (err) {
    console.log(err);
  }
}
main();
