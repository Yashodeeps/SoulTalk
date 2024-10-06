"use client";
import Spline from "@splinetool/react-spline/next";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SplineBall from "@/components/SplineBall";

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
  }, [session, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col pl-12  w-1/2 h-full justify-center items-start">
        <div>
          <h1 className="text-8xl font-bold ">Welcome to TheraTone</h1>
          <p className="text-2xl py-4 ">Your Personalized Therapy Platform</p>
        </div>
        <button
          onClick={handleSignIn}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign Up to get started
          </span>
        </button>
      </div>

      {/* Right side with the Spline animation */}
      <div className="w-1/2 h-full">
        <SplineBall />
      </div>
    </div>
  );
};

export default Page;
