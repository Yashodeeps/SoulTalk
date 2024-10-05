"use client";
import SideMenu from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className=" ">
      <SideMenu />
      <div className="flex justify-center items-center w-screen">
        <Button onClick={() => router.push("/dashboard/room")}>
          Enter Therapy Room
        </Button>
      </div>
    </div>
  );
};

export default page;
