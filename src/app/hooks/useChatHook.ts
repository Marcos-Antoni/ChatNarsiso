"use client";

import { useEffect, useCallback } from "react";
import { useChat } from "../code/store";
import { PeticionLLM } from "../serverAction/PeticionLLM";
import { rudeAssistantPrompt, despedida } from "../code/utils";

const useChatHook = () => {
  const { chats, chatActual, addMessage, changeChatName } = useChat();

  const messages = chats.find(
    (chat) => chat.id === chatActual
  )?.messages;

  const limitePreguntas = chats.find(
    (chat) => chat.id === chatActual
  )?.limitePreguntas;

  const isLimitePreguntas = useCallback(() => {
    const numeroPreguntas =
      messages?.filter((message) => message.role === "user")
        ?.length || 0;

    return numeroPreguntas >= (limitePreguntas ?? 0);
  }, [messages, limitePreguntas]);

  const generarPeticion = (prefix = "") => {
    return (
      messages?.reduce((ask, message) => {
        return ask + `${message.role}: ${message.content}\n`;
      }, prefix) || ""
    );
  };

  const responderPregunta = async () => {
    let ask: string;

    if (isLimitePreguntas()) {
      ask = generarPeticion();
    } else {
      ask = generarPeticion(despedida);
    }

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
      responderPregunta();
    }
    if (messages.length === 2) {
      changeConversationName();
    }
  }, [messages]);
};

export default useChatHook;
