import { Client } from 'discord.js';

export const pingClient = (client: Client) => {
  
client.on('messageCreate', (message) => {
  console.log(message);
  if (message.content === '/ping') {
    message.reply({
      content: "Pong"
    });
  }
});
};
