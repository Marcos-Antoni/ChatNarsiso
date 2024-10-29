"use client";

import { useEffect, useCallback } from "react";
import { useChat } from "../code/store";
import { PeticionLLM } from "../serverAction/PeticionLLM";
import { rudeAssistantPrompt, despedida } from "../code/utils";
import useChatUtils from "./useChatUtils";

const useChatHook = () => {
  const { chats, chatActual, addMessage } = useChat();
  const { limpiarRespuesta, generarPeticion, isLimitePreguntas } =
    useChatUtils();

  const messages = chats.find(
    (chat) => chat.id === chatActual
  )?.messages;

  const responderPregunta = async () => {
    let ask = isLimitePreguntas(chatActual)
      ? generarPeticion(despedida)
      : generarPeticion();

    const res = await PeticionLLM(ask);
    const respuestaLimpia = limpiarRespuesta(res);

    addMessage({ role: "assistant", content: respuestaLimpia });
  };

  useEffect(() => {
    if (!messages || messages.length <= 0) return;

    if (messages[messages.length - 1]?.role === "user") {
      responderPregunta();
    }
  }, [messages]);
};

export default useChatHook;
