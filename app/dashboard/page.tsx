"use client";
import SideMenu from "@/components/SideBar";
import Summarycard from "@/components/Summarycard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen ">
      <div className="flex mt-24  justify-center pb-4">
        <Button onClick={() => router.push("/dashboard/room")}>
          Enter Therapy Room
        </Button>
      </div>
      <div className="flex justify-center text-xl font-semibold py-4 border-t ">
        History : Summary
      </div>

      <div className="flex flex-wrap mx-auto justify-center">
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
        <Summarycard />
      </div>
    </div>
  );
};

export default Page;
