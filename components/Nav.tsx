"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const session = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
  };
  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session, router, handleSignOut]);

  return (
    <div
      className={
        "fixed left-0 right-0 top-0 mb-28 px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
      }
    >
      <div className="font-bold text-lg px-4">SoulTalk</div>
      <div className={"ml-auto flex items-center gap-1"}>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            {isDarkMode ? (
              <Sun className={"size-4"} />
            ) : (
              <Moon className={"size-4"} />
            )}
          </span>
          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        </Button>
        {session.data?.user ? (
          <Button variant={"ghost"} onClick={handleSignOut}>
            Logout
          </Button>
        ) : (
          <Button
            variant={"ghost"}
            onClick={() => {
              signIn("google");
            }}
          >
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
};
