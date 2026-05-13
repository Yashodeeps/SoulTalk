import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

const CONFIG_ID = "038d34b0-8779-4399-8fa6-878521b45462";

export default function StartCall({ accessToken }: { accessToken: string }) {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <>
          {status.value === "error" ? (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-red-600 text-white text-sm px-3 py-2 rounded">
              {status.reason ?? "Failed to connect"}
            </div>
          ) : null}
          <motion.div
            className={
              "fixed inset-0 p-4 flex items-center justify-center bg-background"
            }
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            <AnimatePresence>
              <motion.div
                variants={{
                  initial: { scale: 0.5 },
                  enter: { scale: 1 },
                  exit: { scale: 0.5 },
                }}
              >
                <Button
                  className={"z-50 flex items-center gap-1.5"}
                  onClick={() => {
                    connect({
                      auth: { type: "accessToken", value: accessToken },
                      configId: CONFIG_ID,
                    }).catch((err) => {
                      console.error("Hume connect failed:", err);
                      alert(
                        "Could not start therapy: " +
                          (err instanceof Error ? err.message : String(err))
                      );
                    });
                  }}
                >
                  <span>Start Therapy</span>
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
