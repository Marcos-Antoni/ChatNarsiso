import { create } from "zustand";
import { LimitePreguntas, systemMessage, chatData } from "./utils";
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
  initChats: (chats: ChatObject[], chatActual: number) => void;
}

const useChat = create<ChatState>((set) => ({
  chats: chatData.chats,
  chatActual: chatData.chatActual,

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
    set(({ chats, chatActual }) => ({
      chats: chats.filter((chat) => chat.id !== id),
      chatActual: id === chatActual ? chats[0]?.id : chatActual,
    })),

  changeChatName: (id, name) =>
    set((state) => {
      return {
        chats: state.chats.map((chat) =>
          chat.id === id ? { ...chat, name } : chat
        ),
      };
    }),

  changeChatActual: (id) => set(() => ({ chatActual: id })),
  initChats: (chats, chatActual) =>
    set(() => ({ chats, chatActual })),
}));

// Export -------------------------------------------------------------------------------------------------
export { useChat };
