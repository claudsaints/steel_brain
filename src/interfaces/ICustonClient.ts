import { Collection } from "discord.js";
import IConfig from "./IConfig";
import Command from "../class/Command";
import SubCommand from "../class/SubCommand";

export default interface ICustonClient{
    config: IConfig;

    commands: Collection<string,Command>;
    subCommands: Collection<string,SubCommand>;

    cooldown: Collection<string, Collection<String,number>>

    Init():void;

    LoadHandlers():void;

}