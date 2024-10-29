import { useState } from "react";
import { useChat } from "../code/store";
import useChatUtils from "./useChatUtils";

const useInputHook = () => {
  const { isLimitePreguntas } = useChatUtils();

  const addMessage = useChat((state) => state.addMessage);
  const { chats, chatActual } = useChat();
  const chat = chats.find((chat) => chat.id === chatActual);

  const [input, setInput] = useState("");

  const isUser =
    chat?.messages[chat?.messages.length - 1]?.role === "user";

  const isUserOrLimitePreguntas =
    isUser || isLimitePreguntas(chatActual);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUserOrLimitePreguntas) return;

    if (input.trim()) {
      addMessage({ role: "user", content: input });
      setInput("");
    }
  };

  return {
    input,
    setInput,
    handleSubmit,
    isUserOrLimitePreguntas,
  };
};

export default useInputHook;
