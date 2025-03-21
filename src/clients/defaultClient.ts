import { Client } from 'discord.js';


export const defaultClient = (client: Client) => {
  
client.on("messageCreate", (message) => {
    if(message.author.id == client.user?.id) return;
    
    message.reply({
        content: `Olá ${message.author.username}`
    })
});
};
