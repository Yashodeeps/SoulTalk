"use client";
import SideMenu from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex mt-24  justify-center w-screen h-screen">
      <Button onClick={() => router.push("/dashboard/room")}>
        Enter Therapy Room
      </Button>
    </div>
  );
};

export default Page;
