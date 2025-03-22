import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import SteelClient from "../class/SteelClient";
import Category from "../enums/Category";

export default interface ICommand{
    client: SteelClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permission:boolean;
    cooldown: number;
    Execute(interaction:ChatInputCommandInteraction): void;
    AutoComplete(interaction: AutocompleteInteraction): void;
    Execute(interaction:ChatInputCommandInteraction): void;


}