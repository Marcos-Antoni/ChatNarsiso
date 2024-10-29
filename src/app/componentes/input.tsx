"use client";
import React, { useState, useCallback } from "react";
import { useChat } from "../code/store";

const Input: React.FC = () => {
  const addMessage = useChat((state) => state.addMessage);
  const { chats, chatActual } = useChat();

  const chat = chats.find((chat) => chat.id === chatActual);

  const isUser =
    chat?.messages[chat?.messages.length - 1]?.role === "user";

  const limitePreguntas = useCallback(() => {
    const numeroPreguntas =
      chat?.messages.filter((message) => message.role === "user")
        ?.length || 0;

    return numeroPreguntas >= (chat?.limitePreguntas ?? 0);
  }, [chat]);

  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUser || limitePreguntas()) return;

    if (input.trim()) {
      addMessage({ role: "user", content: input });
      setInput("");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="w-full p-2 sm:w-[90%] sm:p-4 max-w-3xl flex"
        onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-zinc-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type={isUser || limitePreguntas() ? "button" : "submit"}
          className={`px-4 py-2 rounded-r-lg transition duration-300 ${
            isUser || limitePreguntas()
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Input;
