"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useMessage } from "@/lib/AppContext";
import axios from "axios";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const { messagesObj } = useMessage();

  //@ts-ignore
  const filteredMessages =
    messagesObj &&
    // @ts-ignore
    messagesObj.map((msg) => {
      if (msg.type === "user_message" || msg.type === "assistant_message") {
        return msg;
      }
    });

  const conversationString = (filteredMessages || [])
    .filter((msg) => msg !== undefined)
    .map(
      (msg: { type: string; message: { content?: string; text?: string } }) => {
        const role = msg.type === "user_message" ? "User" : "AI";
        const content = msg.message.content || msg.message.text || "No content";
        return `${role}: ${content}`;
      }
    )
    .join("\n");
  console.log({ conversationString });
  async function handleSummary() {
    if (!conversationString.trim()) {
      console.warn("No conversation to summarize");
      return;
    }
    try {
      const response = await axios.post("/api/summary", {
        conversation: conversationString,
      });
      console.log("summary saved:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "summary save failed:",
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error("summary save failed:", error);
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            <Button
              className={"flex items-center gap-1"}
              onClick={async () => {
                await handleSummary();
                disconnect();
              }}
              variant={"destructive"}
            >
              <span>End Therapy Session</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
