"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { useChat } from "../code/store";
import { useSideBarHook } from "../hooks/useSideBarHook";

interface ComponentProps {
  toggleSideBar: () => void;
}

export default function SideBar({ toggleSideBar }: ComponentProps) {
  const { chats, chatActual, changeChatActual, deleteChat, addChat } =
    useChat();

  const { changeConversationName } = useSideBarHook();

  return (
    <div
      className={`w-full h-screen sm:w-[230px] bg-gray-800 text-gray-200 p-4 flex-col sm:relative fixed top-0 left-0 z-10 flex`}>
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Chats</h1>
        <button
          onClick={addChat}
          disabled={chats.length >= 5}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded disabled:opacity-50">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full sm:w-[200px] flex-grow">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="w-full flex items-center justify-between mb-2">
            <div
              onClick={() => changeChatActual(chat.id)}
              className={`w-[85%]  flex items-center justify-between p-2 rounded cursor-pointer ${
                chat.id === chatActual
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}>
              <div className="flex items-center w-full">
                <button
                  className="hover:text-green-400"
                  onClick={() => {
                    if (chat.id === chatActual) {
                      changeConversationName(chat.id);
                    } else {
                      changeChatActual(chat.id);
                    }
                  }}
                  title={chat.id === chatActual ? "Renombrar" : "Ir"}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                </button>

                <span
                  className="text-sm truncate w-[80%]"
                  title={chat.name}>
                  {chat.name}
                </span>
              </div>
            </div>
            {chats.length > 1 && (
              <button
                className="h-full w-[15%] flex items-center justify-center rounded  hover:text-red-400"
                onClick={() => deleteChat(chat.id)}>
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-300">
        {chats.length < 5
          ? `${5 - chats.length} conversaciones disponibles`
          : "Límite de conversaciones alcanzado"}
      </p>

      <button
        onClick={toggleSideBar}
        className="mt-4 py-1 w-full border border-gray-300 text-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-700 rounded">
        Cerrar
      </button>
    </div>
  );
}
