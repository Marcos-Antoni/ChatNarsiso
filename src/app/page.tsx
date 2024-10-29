"use client";

import React from "react";
import Chat from "./componentes/chat";
import Input from "./componentes/input";
import SideBar from "./componentes/sideBar";
import usePageHook from "./hooks/usePageHook";
import { useSideBar } from "./code/store";

export default function Home() {
  const { isOpen, toggleSideBar } = useSideBar();
  usePageHook();

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <button
        className={`absolute top-4 left-4 z-50 border border-gray-700 text-white py-1 px-3 rounded 
        ${
          isOpen ? "hidden" : "flex"
        } hover:bg-white hover:text-gray-700 hover:border-white hover:flex-row-reverse`}
        onClick={() => toggleSideBar()}>
        Abrir
      </button>

      <div className="flex flex-col justify-between w-full bg-zinc-900 text-white">
        <div className="flex flex-col items-center w-full relative p-4 max-h-[calc(100vh-63px)] scroll">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 h-[63px]">
            El Narcisista
          </h1>

          <div className="w-[90%] max-w-3xl rounded-lg flex flex-col justify-between pb-10">
            <Chat />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Input />
        </div>
      </div>
    </div>
  );
}
