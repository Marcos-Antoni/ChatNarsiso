"use client";
import React from "react";
import useInputHook from "../hooks/useInputHook";

const Input: React.FC = () => {
  const { input, setInput, handleSubmit, isUserOrLimitePreguntas } =
    useInputHook();

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
          type={isUserOrLimitePreguntas ? "button" : "submit"}
          className={`px-4 py-2 rounded-r-lg transition duration-300 ${
            isUserOrLimitePreguntas
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
