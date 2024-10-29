import { useChat } from "../code/store";

const useChatUtils = () => {
  const { chats, chatActual } = useChat();

  const limpiarRespuesta = (res: string) => {
    const regex = /^(user|assistant|system):/i;
    const splitRegex = /user:|assistant:|system:/i;
    res = res.replace(regex, "").split(splitRegex)[0].trim();
    return res;
  };

  const generarPeticion = (prefix = "", role = "") => {
    const chat = chats.find((chat) => chat.id === chatActual);
    if (!chat) return prefix;

    return chat.messages.reduce((ask, message) => {
      if (message.role !== role) {
        return ask + `${message.role}: ${message.content}\n`;
      }
      return ask;
    }, prefix);
  };

  const isLimitePreguntas = (chatId: number) => {
    const { messages, limitePreguntas } =
      chats.find((chat) => chat.id === chatId) ?? {};

    const numeroPreguntas =
      messages?.filter((message) => message.role === "user")
        ?.length || 0;
    return numeroPreguntas >= (limitePreguntas ?? 0);
  };

  return { limpiarRespuesta, generarPeticion, isLimitePreguntas };
};

export default useChatUtils;
