import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";
import { logger } from "@/app/api/logger";
import { philipsAPI } from "@/app/api/philipsAPI";

export async function GET(request: Request) {
  return NextResponse.json(
    { status: "OK" },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const req = await request.json();
  logger.info("Recieved command: " + req.command);

  return await philipsAPI
    .sendKey(req.command)
    .then((res) => {
      logger.info("Command sent" + res.data);
      return NextResponse.json(
        { status: "OK" },
        {
          status: 200,
        }
      );
    })
    .catch((error) => {
      logger.error("Failed to send command" + error);
      return NextResponse.json(
        { error: "Failed to send command" },
        {
          status: 500,
        }
      );
    });
}
