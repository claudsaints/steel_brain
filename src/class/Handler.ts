
import { glob } from "glob";
import IHandler from "../interfaces/IHandler";
import path from "path";
import SteelClient from "./SteelClient";
import Command from "./Command";
import SubCommand from "./SubCommand";

export default class Handler implements IHandler{
    client: SteelClient;
    constructor(client: SteelClient){
        this.client = client;

    }
    async LoadEvents() {
        try{
            const files = await glob("build/events/**/*.js");
            for(const filePath of files){
                const fullPath = path.resolve(filePath)
                const eventModule = await import(fullPath);
                const EventClass = eventModule.default;

                if (!EventClass) {
                    console.log(`[ERRO] O arquivo ${filePath.split("/").pop()} não possui uma exportação padrão válida.`);
                    continue;
                  }
          
                  const event = new EventClass(this.client);
          
                  if (!event.name) {
                    console.log(`[ERRO] O evento ${filePath.split("/").pop()} não possui um nome.`);
                    continue;
                  }
          
                  // Define o listener do evento (uma única vez ou persistente)
                  const execute = (...args: any[]) => event.Execute(...args);
                  if (event.once) {
                    this.client.once(event.name, execute);
                  } else {
                    this.client.on(event.name, execute);
                  }
          
                  console.log(`[SUCESSO] Evento carregado: ${event.name}`);
            }   
        }catch(error){
            console.error("[ERRO] Falha ao carregar eventos:", error);
        }
    }

    async LoadCommands() {
        try{
            const files = await glob("build/commands/**/*.js");
            for(const filePath of files){
                const fullPath = path.resolve(filePath)
                const eventModule = await import(fullPath);
                const EventClass = eventModule.default;

                if (!EventClass) {
                    console.log(`[ERRO] O arquivo ${filePath.split("/").pop()} não possui uma exportação padrão válida.`);
                    continue;
                  }
          
                  const command: Command | SubCommand = new EventClass(this.client);
          
                  if (!command.name) {
                    console.log(`[ERRO] O evento ${filePath.split("/").pop()} não possui um nome.`);
                    continue;
                  }

                  if(filePath.split("/").pop()?.split(".")[2]) return this.client.subCommands.set(command.name,command)
          
                  
                  this.client.commands.set(command.name,command as Command);
          
                  console.log(`[SUCESSO] Evento carregado: ${command.name}`);
            }   
        }catch(error){
            console.error("[ERRO] Falha ao carregar eventos:", error);
        }
    }
}