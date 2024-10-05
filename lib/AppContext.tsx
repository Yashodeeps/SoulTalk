import { createContext, useContext, useState } from "react";

// Create the context
const MessageContext = createContext({
  messagesObj: null,
  setMessagesObj: (messages: any) => {},
});

// Create a provider component
export const MessageProvider = ({ children }: any) => {
  const [messagesObj, setMessagesObj] = useState(null);

  return (
    <MessageContext.Provider value={{ messagesObj, setMessagesObj }}>
      {children}
    </MessageContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const useMessage = () => useContext(MessageContext);
