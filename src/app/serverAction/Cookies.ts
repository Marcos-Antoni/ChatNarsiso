"use server";

import { cookies } from "next/headers";
import type { ChatObject } from "../code/store";
import { LimitePreguntas, systemMessage } from "../code/utils";

interface ChatData {
  chats: ChatObject[];
  chatActual: number;
}

export const guardarChats = ({ chats, chatActual }: ChatData) => {
  const chatData = JSON.stringify({ chats, chatActual });

  cookies().set("chatData", chatData);
};

export const sacarChats = () => {
  const chatData = cookies().get("chatData");
  if (chatData) {
    const { chats, chatActual } = JSON.parse(chatData.value);

    return { chats, chatActual };
  }

  return {
    chats: [
      {
        id: 1,
        name: "Narciso 1",
        limitePreguntas: LimitePreguntas(),
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
        ],
      },
    ],
    chatActual: 1,
  };
};
