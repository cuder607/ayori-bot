import { SlashCommandBuilder } from '@discordjs/builders';
const orderCommand = new SlashCommandBuilder()
        .setName('order')
        .setDescription('Order your favorite meal!')
        .addStringOption((option) =>
            option
                .setName('food')
                .setDescription('The type of food')
                .addChoices(
                    { name: 'Cake', value: 'Cake' },
                    { name: 'Apple', value: 'Apple' }
                )
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('drink')
                .setDescription('The type of drink')
                .addChoices(
                    { name: 'Coca cola', value: 'Coca cola' },
                    { name: 'Sprite', value: 'Sprite' }
                )
                .setRequired(true),
        )

export default orderCommand.toJSON();