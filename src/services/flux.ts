import Together from "together-ai";
import dotenv from "dotenv"

dotenv.config();

const together = new Together({apiKey:process.env.IMAGE_API_KEY});
export const fetchImage = async (prompt:string): Promise<any> => {
    const response = await together.images.create({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt: prompt,
        steps: 4,
        n: 4
    });

    return response.data[0].url;
}
 


