"use client";

import { useChat } from "../code/store";
import { PeticionLLM } from "../serverAction/PeticionLLM";
import { rudeAssistantPrompt } from "../code/utils";
import useChatUtils from "./useChatUtils";
import { useEffect } from "react";

export function useSideBarHook() {
  const { changeChatName, chats, chatActual } = useChat();
  const { limpiarRespuesta, generarPeticion } = useChatUtils();

  const messages = chats.find(
    (chat) => chat.id === chatActual
  )?.messages;

  const changeConversationName = async (id = chatActual) => {
    const ask = generarPeticion(rudeAssistantPrompt);
    changeChatName(id, "cargando...");

    const res = await PeticionLLM(ask);
    const respuestaLimpia = limpiarRespuesta(res);

    changeChatName(id, respuestaLimpia);
  };

  useEffect(() => {
    if (messages?.length === 2) {
      changeConversationName();
    }
  }, [messages]);

  return {
    changeConversationName,
  };
}
