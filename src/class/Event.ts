import { Events } from "discord.js";
import IEvent from "../interfaces/IEvent";
import SteelClient from "./SteelClient";
import IEventOptions from "../interfaces/IEventOptions";

export default class Event implements IEvent{
    client: SteelClient;
    description: string;
    name: Events;
    once: boolean;

    constructor(client:SteelClient,options: IEventOptions){
        this.client =client;
        this.description = options.description;
        this.name = options.name;
        this.once = options.once;

    }

    Execute(...args:any):void {}

}