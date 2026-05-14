import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const Chat = nextDynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className={"grow flex flex-col"}>
      <BackgroundBeamsWithCollision>
        <Chat />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
