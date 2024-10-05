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
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    const apiKey = process.env.NEXT_PUBLIC_GEMINI;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_GEMINI is not defined");
    }
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Give a third person summary of a conversation messages between user and Ai therapist in under 300 words. Summarize such that the learnings of the users form the talk and users mental health status. Heres the conversation: ${conversationString}`;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
    } catch (error) {
      console.log("error", error);
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
              onClick={() => {
                disconnect();
                console.log({ messagesObj });
                handleSummary();
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
