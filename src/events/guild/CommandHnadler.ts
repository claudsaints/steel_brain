import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import SteelClient from "../../class/SteelClient";
import Event from "../../class/Event";

export default class CommandHandler extends Event {
    constructor(client: SteelClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command handler event",
            once: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command = this.client.commands.get(interaction.commandName);
        
        // @ts-ignore
        if (!command) 
            return await interaction.reply({ content: "This command does not exist!", ephemeral: true }) 
                && this.client.commands.delete(interaction.commandName);
        
        const { cooldown } = this.client;
        if (!cooldown.has(command.name)) cooldown.set(command.name, new Collection());
        
        const now = Date.now();
        const timestamps = cooldown.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        
        if (timestamps?.has(interaction.user.id)) {
            const expirationTime = (timestamps.get(interaction.user.id) ?? 0) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                return interaction.reply({ 
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`❌ Please wait another \`${timeLeft}\` seconds to run this command!`)
                    ], 
                    ephemeral: true 
                });
            }
        }
        
        timestamps?.set(interaction.user.id, now);
        setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);
        
        
        try {
            const subCommandGroup = interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;
        
            return this.client.subCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction);
        } catch (ex) {
            console.log(ex);
        }
        
    }
}
