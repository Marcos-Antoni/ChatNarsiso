"use client";
import React, { useState, useEffect } from "react";
import useStore from "../code/conversacion";
import { PeticionLLM } from "../serverAction/PeticionLLM";

const Input: React.FC = () => {
  const addMessage = useStore((state) => state.addMessage);
  const messages = useStore((state) => state.messages);

  const [input, setInput] = useState("");
  const isUser = messages[messages.length - 1].role === "user";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage({ role: "user", content: input });
      setInput("");
    }
  };

  const configurarPeticion = async () => {
    let ask = "";
    messages.forEach((message) => {
      ask += `${message.role}: ${message.content}\n`;
    });

    console.log(ask);
    const res = await PeticionLLM(ask);
    addMessage({ role: "assistant", content: res });
  };

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      configurarPeticion();
    }
  }, [messages]);

  return (
    <div className="w-full flex justify-center fixed bottom-0 left-0">
      <form
        className="w-[90%] max-w-3xl flex p-4"
        onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-zinc-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type={isUser ? "button" : "submit"}
          className={`px-4 py-2 rounded-r-lg transition duration-300 ${
            isUser
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
