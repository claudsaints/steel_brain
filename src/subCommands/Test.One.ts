import { ChatInputCommandInteraction } from "discord.js";
import SteelClient from "../class/SteelClient";
import SubCommand from "../class/SubCommand";

export default class TestOne extends SubCommand {
    constructor(client: SteelClient) {
        super(client, {
            name: "test.one",
      
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "test1 subcommand!", ephemeral: true });
    }
}
