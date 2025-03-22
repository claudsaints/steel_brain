import { Collection, Events, REST, Routes } from "discord.js";
import Event from "../../class/Event";
import SteelClient from "../../class/SteelClient";
import Command from "../../class/Command";
import { config } from "../../config";
export default class Ready extends Event{
    constructor(client:SteelClient){
        super(client, {
            name: Events.ClientReady,
            description: "Ready Event",
            once: true
        })
    }
    async Execute(...args: any): Promise<void> {
        console.log(`${this.client.user?.tag} is now Ready` )
        const commands: object[] = this.GetJson(this.client.commands);

        const rest = new REST({version: '10'}).setToken(config.DISCORD_TOKEN)

        console.log(this.client.config.discordClientId, this.client.config.guildId)

        const setCommands = await rest.put(Routes.applicationGuildCommands(this.client.config.discordClientId, this.client.config.guildId), {
            body: commands
        })

        console.log("Success to up your commands")
    }

    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = [];

        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.default_member_permissions?.toString(),
                dm_permission: command.dm_permission
            });
        });

        return data;
    }

}