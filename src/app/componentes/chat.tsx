import React from "react";
import { useChat } from "../code/store";
import useChatHook from "../hooks/useChatHook";

const Chat: React.FC = () => {
  useChatHook();
  const { chats, chatActual } = useChat();

  const messages = chats.find(
    (chat) => chat.id === chatActual
  )?.messages;

  return (
    <div className="flex-grow mb-4">
      {messages?.map(
        (message, index) =>
          message.role !== "system" && (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500"
                    : "bg-zinc-700"
                }`}>
                {message.content}
              </span>
            </div>
          )
      )}
    </div>
  );
};

export default Chat;
