import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {NextResponse} from "next/server";
import {logger} from "@/app/api/logger";
import {philipsAPI} from "@/app/api/philipsAPI";

export async function GET(request: Request) {
  logger.info("POWER::::Getting the power state");
  return philipsAPI?.getPowerState()?.then((powerState) => {
    logger.info(`POWER::::Power state is ${powerState}`);
    return NextResponse.json({powerState: powerState}, {
      status: 200,
    });
  }).catch((error) => {
    logger.error(`POWER::::Failed to get power state`);
    return NextResponse.json({error: `Failed to get power state`}, {
      status: 500,
    })
  });
}

export async function POST(request: Request) {
  logger.info("Setting the power state");
}
