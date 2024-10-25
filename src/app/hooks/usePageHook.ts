import { useEffect } from "react";
import { useChat } from "../code/store";
import { guardarChats } from "../serverAction/Cookies";

const usePageHook = () => {
  const { chats, chatActual } = useChat();

  useEffect(() => {
    guardarChats({ chats, chatActual });
  }, [chats, chatActual]);
};

export default usePageHook;
