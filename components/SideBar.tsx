"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import path from "path";
import React, { useState } from "react";

const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("home");

  console.log(pathname);
  return (
    <div className="p-4 mx-4 border text-base border-gray-700 shadow-lg rounded-lg  text-zinc-300  w-1/5 h-fit my-28 ">
      <ul className="space-y-3">
        <li
          onClick={() => {
            setActive("home");
            router.push("/dashboard");
          }}
          className={
            active === "home"
              ? " hover:bg-purple-500 bg-purple-600 rounded-lg cursor-pointer px-3 py-2"
              : "hover:bg-black rounded-lg cursor-pointer  px-3 py-2"
          }
        >
          Home
        </li>
        <li
          onClick={() => {
            setActive("history");
          }}
          className={
            active === "home"
              ? " hover:bg-purple-500 bg-purple-600 rounded-lg cursor-pointer px-3 py-2"
              : "hover:bg-black rounded-lg cursor-pointer  px-3 py-2"
          }
        >
          History
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
