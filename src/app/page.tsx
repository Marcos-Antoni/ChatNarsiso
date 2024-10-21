"use client";

import React from "react";
import Chat from "./componentes/chat";
import Input from "./componentes/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full min-h-screen bg-zinc-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-2 h-[63px]">
        El Narcisista
      </h1>

      <div className="w-[90%] max-w-3xl rounded-lg flex flex-col justify-between pb-10">
        <Chat />
      </div>
      <Input />
    </div>
  );
}
