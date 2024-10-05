"use client";

import { useMessage } from "@/lib/AppContext";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useRef } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messagesObj, setMessagesObj } = useMessage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessagesObj(messages);
  }, [messages]);

  return (
    <motion.div
      layoutScroll
      className="fixed inset-0 flex flex-col overflow-hidden p-4"
      ref={ref}
    >
      <div
        ref={scrollRef}
        className="max-w-2xl w-full mx-auto overflow-y-auto flex flex-col gap-4 pb-24 [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    className={cn(
                      "text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3"
                    )}
                  >
                    {msg.message.role}
                  </div>
                  <div className="pb-3 px-3">{msg.message.content}</div>
                  {/* <Expressions values={{ ...msg.models.prosody?.scores }} /> */}
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default Messages;
