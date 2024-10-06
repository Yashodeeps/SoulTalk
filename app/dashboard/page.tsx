"use client";
import SideMenu from "@/components/SideBar";
import Summarycard from "@/components/Summarycard";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "remeda";

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const [summaries, setSummaries] = useState();
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/summary");
      setSummaries(response.data.data);
    } catch (error) {
      console.error(
        "Error getting summary:",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  console.log(summaries);
  return (
    <>
      <div className="w-screen h-screen ">
        <div className="flex mt-24  justify-center pb-4">
          <Button
            className="z-50"
            onClick={() => router.push("/dashboard/room")}
          >
            Enter Therapy Room
          </Button>
        </div>
        <div className="flex justify-center text-xl font-semibold py-4 border-t ">
          History : Summary
        </div>

        <div className="flex flex-wrap mx-auto justify-center">
          {summaries ? (
            // @ts-ignore
            summaries.map((summary: any) => (
              <Summarycard key={summary.id} summary={summary} />
            ))
          ) : (
            <div className="w-screen flex flex-col items-center justify-center ">
              <Skeleton className="w-1/2 h-60  p-4 py-2 m-4  border border-gray-500 rounded-lg shadow-lg" />
              <div className="h-6 border-b"></div>
              <Skeleton className="w-1/2 h-60  p-4 py-2 m-4  border border-gray-500 rounded-lg shadow-lg" />
              <div className="h-6 border-b"></div>
            </div>
          )}
        </div>
      </div>
      <BackgroundBeams />
    </>
  );
};

export default Page;
