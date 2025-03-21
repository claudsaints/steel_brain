import { Client } from "discord.js";
import { fetchImage } from "../services/flux";
import axios from "axios";

export const clearClient = (client:Client) => {
client.on('messageCreate', async (message) => {
    if (message.content.startsWith("/generate")) {
        const prompt = message.content.slice(9).trim();  
    
        try {
        // Obter a URL da imagem com base no prompt (ajuste conforme necessário)
        const url = await fetchImage(prompt); 
    
        // Requisição para pegar a imagem
        const response = await axios.get<ArrayBuffer>(url, {
            responseType: 'arraybuffer', // Especifica que queremos os dados como ArrayBuffer
        });
    
        // Verificando se a requisição foi bem-sucedida
        if (response.status !== 200) {
            console.error(`Erro ao obter a imagem. Status code: ${response.status}`);
            return;
        }
    
        // Convertendo o ArrayBuffer para Buffer (no Node.js)
        const imagemBuffer = Buffer.from(response.data);
        console.log("Imagem obtida como Buffer com sucesso!");
    
        // Enviar o anexo para o Discord diretamente com o Buffer
        await message.channel.send({
            content: "Aqui está sua imagem gerada!",
            files: [{
            attachment: imagemBuffer, // Passando diretamente o buffer da imagem
            name: 'image.jpg', // Nome do arquivo
            }],
        });
        } catch (error: any) {
        console.log('Erro geral:', error.message);
        message.reply('Houve um erro desconhecido. Tente novamente mais tarde!');
        }
    }
    });
    
     
  }