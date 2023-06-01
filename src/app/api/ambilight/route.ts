import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {NextResponse} from "next/server";
import {logger} from "@/app/api/logger";
import {philipsAPI} from "@/app/api/philipsAPI";

export async function GET(request: Request) {
  return NextResponse.json({status: "OK"}, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const req = await request.json();
  logger.info("Switching source to the" + req.direction);
  const directionIsRight = req.direction === "right";
  try {
    // logger.info("Switching source right" + req.body);
    await philipsAPI.sendKey("Source");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for the source menu to open
    await philipsAPI.sendKey(directionIsRight ? "CursorRight" : "CursorLeft");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for the selection to move
    await philipsAPI.sendKey("Confirm");

    logger.info('Switched source')
    return NextResponse.json({status: "OK"}, {
      status: 200,
    });
  } catch (error: any) {
    logger.error(`Failed to switch source, Are you sure the TV is on?`);
    return NextResponse.json({error: `Failed to switch source, Are you sure the TV is on?`}, {
      status: 500,
    })
  }
  return NextResponse.json({status: "OK"}, {
        status: 200,
      });
}
