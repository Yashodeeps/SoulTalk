"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("An error occurred while signing in:", error);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      router.push("/dashboard");
    }
  }, [session, router, handleSignIn]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Button onClick={handleSignIn}>Sign in with google</Button>
      </div>
    </div>
  );
};

export default Page;
