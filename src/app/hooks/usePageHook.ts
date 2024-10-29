import { useEffect, useState } from "react";
import { useChat } from "../code/store";
import { guardarChats, sacarChats } from "../code/utils";

const usePageHook = () => {
  const initChats = useChat((state) => state.initChats);

  const { chats, chatActual } = useChat();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

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

  return {
    isOpen,
    toggleSideBar,
  };
};

export default usePageHook;
