"use client";

import { useEffect, useState } from "react";
import { useChat } from "../code/store";
import { guardarChats, sacarChats } from "../code/utils";

const usePageHook = () => {
  const initChats = useChat((state) => state.initChats);

  const { chats, chatActual } = useChat();
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const data = sacarChats();

    if (data) initChats(data.chats, data.chatActual);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    guardarChats({ chats, chatActual });
  }, [chats, chatActual]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 640 ? !isOpen : isOpen);
    };

    handleResize();
  }, []);

  return {
    isOpen,
    toggleSideBar,
  };
};

export default usePageHook;
