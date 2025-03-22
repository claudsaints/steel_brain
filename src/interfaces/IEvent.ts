import { Events } from "discord.js";
import SteelClient from "../class/SteelClient";

export default interface IEvent{
    client: SteelClient;
    name: Events;
    description: string;
    once: boolean;

}