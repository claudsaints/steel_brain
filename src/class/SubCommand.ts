import { CacheType, ChatInputCommandInteraction } from "discord.js";
import ISubCommand from "../interfaces/ISubCommand";
import SteelClient from "./SteelClient";
import ISubCommandOptions from "../interfaces/ISubCommandOptions";

export default class SubCommand implements ISubCommand{
    client: SteelClient;
    name: string;
    constructor(client:SteelClient, options: ISubCommandOptions){
        this.name = options.name;
        this. client = client;

    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {

    }
    
}