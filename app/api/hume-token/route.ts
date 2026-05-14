import { NextResponse } from "next/server";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Failed to mint Hume access token" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { accessToken },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}
