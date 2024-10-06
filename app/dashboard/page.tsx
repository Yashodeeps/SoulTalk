"use client";
import SideMenu from "@/components/SideBar";
import Summarycard from "@/components/Summarycard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "remeda";

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const [summaries, setSummaries] = useState();

  const getSummary = async () => {
    try {
      const response = await axios.get("/api/summary");
      setSummaries(response.data.data);
    } catch (error) {
      console.error(
        "Error getting summary:",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  console.log(summaries);
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
        {summaries &&
          // @ts-ignore
          summaries.map((summary: any) => (
            <Summarycard key={summary.id} summary={summary} />
          ))}
      </div>
    </div>
  );
};

export default Page;
