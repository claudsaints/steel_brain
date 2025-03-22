import {  ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import SteelClient from "../class/SteelClient";
import Command from "../class/Command";
import Category from "../enums/Category";

export default class Test extends Command {
    constructor(client: SteelClient) {
        super(client, {
            name: "test",
            description: "My test command",
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "one",
                    description: "2",
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: "two",
                    description: "2",
                    type: ApplicationCommandOptionType.Subcommand
                }
            
            
            ],
      
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "Test command has been ran!", ephemeral: true });
    }
}
