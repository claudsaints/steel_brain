import { Client, ClientOptions, Collection } from "discord.js";
import ICustonClient from "../interfaces/ICustonClient";
import IConfig from "../interfaces/IConfig";
import {config} from "../config"
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";


export default class SteelClient extends Client implements ICustonClient{
    handler:Handler;
    config: IConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldown: Collection<string, Collection<String, number>>;
    constructor(){
        super({intents: []})
        this.config = {token: config.DISCORD_TOKEN, discordClientId: config.DISCORD_CLIENT_ID, guildId: config.DISCORD_GUILD_ID}
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldown =new Collection();
    }
    Init(): void {
        this.LoadHandlers();
        this.login(this.config.token)
        .catch((error) => console.log(error))
    }
    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}