import { ChatInputCommandInteraction } from "discord.js";
import SteelClient from "../class/SteelClient";

export default interface ISubCommand{
    client: SteelClient;
    name: string;
    Execute(interaction: ChatInputCommandInteraction):void 
}