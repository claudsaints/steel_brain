import { Client } from "discord.js";

export const clearClient = (client:Client) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '/clear') {
          try {
            // Obtém as últimas 10 mensagens do canal
            const messages = await message.channel.messages.fetch({ limit: 10 });
            
            // Apaga cada mensagem
            messages.forEach(async (msg) => {
              await msg.delete();
            });
          } catch (error) {
            console.error('Erro ao tentar apagar as mensagens:', error);
          }
        }
      });
}