"use client";

import React from "react";
import Chat from "./componentes/chat";
import Input from "./componentes/input";
import SideBar from "./componentes/sideBar";
import usePageHook from "./hooks/usePageHook";

export default function Home() {
  usePageHook();

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-col justify-between w-full bg-zinc-900 text-white">
        <div className="flex flex-col items-center w-full relative p-4 max-h-[calc(100vh-63px)] scroll">
          <h1 className="text-4xl font-bold mb-2 h-[63px]">
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
