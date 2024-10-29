import { useEffect, useState } from "react";
import { useChat } from "../code/store";
import { guardarChats, sacarChats } from "../code/utils";

const usePageHook = () => {
  const { chats, chatActual } = useChat();
  const initChats = useChat((state) => state.initChats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = sacarChats();

    if (data) initChats(data.chats, data.chatActual);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    guardarChats({ chats, chatActual });
  }, [chats, chatActual]);
};

export default usePageHook;
