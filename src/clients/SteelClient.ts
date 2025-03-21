import { Client, ClientOptions } from "discord.js";
import ICustonClient from "../interfaces/ICustonClient";
import IConfig from "../interfaces/IConfig";
import {config} from "../config"


export default class SteelClient extends Client implements ICustonClient{
    config: IConfig;
    constructor(){
        super({intents: []})

        this.config = {token: config.DISCORD_TOKEN}
    }
    Init(): void {
        this.login(this.config.token)
        .then(() => console.log("LOGIN SUCCESS"))
        .catch((error) => console.log(error))
    }
}