import { Client } from 'discord.js';
import { fetchChat } from '../services/deepseek';

export const chatClient = (client: Client) => {
  client.on('messageCreate', async (message) => {
    if (message.content.startsWith("/gpt")) {
      const prompt = message.content.slice(4).trim();  
      try {
        const resposta = await fetchChat(prompt);
        message.reply("" + resposta);
        
      } catch (error: any) {    
        console.log('Erro geral:', error.message);
        message.reply('Houve um erro desconhecido. Tente novamente mais tarde!');
      }
    }
  });
};
