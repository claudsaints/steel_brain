import { ChatInputCommandInteraction } from "discord.js";
import SteelClient from "../class/SteelClient";
import SubCommand from "../class/SubCommand";

export default class TestTwo extends SubCommand {
    constructor(client: SteelClient) {
        super(client, {
            name: "test.two",
      
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "test2 subcommand!", ephemeral: true });
    }
}
