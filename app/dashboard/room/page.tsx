import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
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
