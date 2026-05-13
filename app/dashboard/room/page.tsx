import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const Chat = nextDynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      <BackgroundBeamsWithCollision>
        <Chat accessToken={accessToken} />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
