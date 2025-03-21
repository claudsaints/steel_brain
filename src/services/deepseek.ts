
import * as axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const path = "https://openrouter.ai/api/v1/chat/completions";
const { TEXT_GEN_KEY } = process.env;


const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${TEXT_GEN_KEY}`,
  "Content-Type": "application/json",
};



interface itens{

    logprobs: boolean;
    finish_reason: string;
    native_finish_reason: string;
    index: number;
    message: {
        role:string;
        content:string;
    };
      
}

interface responseData{
    choices: itens[];
}

export const fetchChat = async (prompt:string): Promise<any> => {
    try {
        const res =  await axios.post<responseData>(path,{
            "model": "deepseek/deepseek-chat:free",
            "messages": [{"role": "user", "content": prompt}]

        },{headers})
        const {message} = res.data.choices[0]
        console.log(message)
        return message.content;

  } catch (error) {
    console.error("Erro ao buscar ou salvar as imagens:", error);
  }
};


