"use client";

import { useChat } from "../code/store";
import { PeticionLLM } from "../serverAction/PeticionLLM";
import { rudeAssistantPrompt } from "../code/utils";

export function useSideBarHook() {
  const { addChat, deleteChat, changeChatName, chats, chatActual } =
    useChat();

  const addConversation = () => {
    addChat();
  };

  const deleteConversation = (id: number) => {
    deleteChat(id);
  };

  const generarPeticion = (prefix = "", role = "") => {
    const chat = chats.find((chat) => chat.id === chatActual);
    if (!chat) return prefix;

    return chat.messages.reduce((ask, message) => {
      if (message.role !== role) {
        return ask + `${message.role}: ${message.content}\n`;
      }
      return ask;
    }, prefix);
  };

  const changeConversationName = async (id: number) => {
    const ask = generarPeticion(rudeAssistantPrompt);
    changeChatName(id, "cargando...");

    const res = await PeticionLLM(ask);
    const respuestaLimpia = limpiarRespuesta(res);

    changeChatName(id, respuestaLimpia);
  };

  const limpiarRespuesta = (res: string) => {
    const regex = /^(user|assistant|system):/i;
    const splitRegex = /user:|assistant:|system:/i;
    res = res.replace(regex, "").split(splitRegex)[0].trim();
    return res;
  };

  return {
    addConversation,
    deleteConversation,
    changeConversationName,
  };
}
