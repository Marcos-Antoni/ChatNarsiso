"use client";

import { create } from "zustand";
import { LimitePreguntas, systemMessage } from "./utils";

// Chat -------------------------------------------------------------------------------------------------
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatObject {
  id: number;
  name: string;
  messages: Message[];
  limitePreguntas: number;
}

interface ChatState {
  chats: ChatObject[];
  chatActual: number;
  addMessage: (message: Message) => void;
  addChat: () => void;
  deleteChat: (id: number) => void;
  changeChatName: (id: number, name: string) => void;
  changeChatActual: (id: number) => void;
}

const useChat = create<ChatState>((set) => ({
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

  addMessage: (message) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) =>
        chat.id === state.chatActual
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );

      return { chats: updatedChats };
    }),

  addChat: () =>
    set((state) => {
      const id = Math.floor(Math.random() * 10000) + 1;
      const name = `Narciso ${id}`;
      return {
        chats: [
          ...state.chats,
          {
            id,
            name,
            limitePreguntas: LimitePreguntas(),
            messages: [{ role: "system", content: systemMessage }],
          },
        ],
      };
    }),

  deleteChat: (id) =>
    set((state) => {
      const updatedChats = state.chats.filter(
        (chat) => chat.id !== id
      );

      const newChatActual = updatedChats.find(
        (chat) => chat.id === state.chatActual
      )
        ? state.chatActual
        : updatedChats[0].id;

      return {
        chats: updatedChats,
        chatActual: newChatActual,
      };
    }),

  changeChatName: (id, name) =>
    set((state) => {
      return {
        chats: state.chats.map((chat) =>
          chat.id === id ? { ...chat, name } : chat
        ),
      };
    }),

  changeChatActual: (id) => set((state) => ({ chatActual: id })),
}));

// SideBar -------------------------------------------------------------------------------------------------
interface SideBarState {
  isOpen: boolean;
  toggleSideBar: () => void;
}

const useSideBar = create<SideBarState>((set) => ({
  isOpen: true,
  toggleSideBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

// Export -------------------------------------------------------------------------------------------------
export { useChat, useSideBar };
