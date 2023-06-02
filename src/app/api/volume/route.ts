import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";
import { logger } from "@/app/api/logger";
import { philipsAPI } from "@/app/api/philipsAPI";

export async function GET(request: Request) {
  return await philipsAPI
      .getCurrentVolume()
      .then((res) => {
        logger.info("Volume set: " + res.current);
        logger.info("Is muted: " + res.muted)
        return NextResponse.json( { status: "OK", volume: res.current, muted: res.muted }, { status: 200 });
      })
      .catch((error) => {
        logger.error("Failed to set volume" + error);
        return NextResponse.json(
          { error: "Failed to set volume" },
          {
            status: 500,
          }
        );
      });
}
