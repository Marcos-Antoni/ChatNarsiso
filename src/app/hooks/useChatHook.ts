"use client";

import { useEffect } from "react";
import { useChat } from "../code/store";
import { PeticionLLM } from "../serverAction/PeticionLLM";
import { rudeAssistantPrompt } from "../code/utils";

const useChatHook = () => {
  const { chats, chatActual } = useChat();

  const messages = chats.find(
    (chat) => chat.id === chatActual
  )?.messages;

  const addMessage = useChat((state) => state.addMessage);
  const changeChatName = useChat((state) => state.changeChatName);

  const generarPeticion = (prefix = "") => {
    return (
      messages?.reduce((ask, message) => {
        return ask + `${message.role}: ${message.content}\n`;
      }, prefix) || ""
    );
  };

  const configurarPeticion = async () => {
    const ask = generarPeticion();
    const res = await PeticionLLM(ask);
    const respuestaLimpia = limpiarRespuesta(res);

    addMessage({ role: "assistant", content: respuestaLimpia });
  };

  const limpiarRespuesta = (res: string) => {
    const regex = /^(user|assistant|system):/;

    if (regex.test(res)) res = res.replace(regex, "");

    res = res.split(/user:|assistant:|system:/)[0];

    return res;
  };

  const changeConversationName = async () => {
    const ask = generarPeticion(rudeAssistantPrompt);

    changeChatName(chatActual, "cargando...");

    const res = await PeticionLLM(ask);
    const respuestaLimpia = limpiarRespuesta(res);

    changeChatName(chatActual, respuestaLimpia);
  };

  useEffect(() => {
    if (!messages || messages.length <= 0) return;

    if (messages[messages.length - 1]?.role === "user") {
      configurarPeticion();
    }
    if (messages.length === 3) {
      changeConversationName();
    }
  }, [messages]);
};

export default useChatHook;
