
import { Client} from "discord.js";
import { config } from "./config";
import { pingClient,clearClient,chatClient,} from "./clients";


const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages","MessageContent"],
  
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});



pingClient(client);
clearClient(client);
chatClient(client);



client.login(config.DISCORD_TOKEN);
console.log(process.env.REPLICATE_API_KEY);  // Para verificar se o token está correto
