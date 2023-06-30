import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {NextResponse} from "next/server";
import {logger} from "@/app/api/logger";
import {philipsAPI} from "@/app/api/philipsAPI";

export async function GET(request: Request) {
  logger.info("GET /api/ambilight");
  return await philipsAPI.getAmbilightConfiguration().then((res) => {
    logger.info("Ambilight configuration fetched");
    return NextResponse.json(res, {
      status: 200,
    });
  }).catch((error) => {
    logger.error("Failed to fetch ambilight configuration" + error);
    return NextResponse.json({error: "Failed to fetch ambilight configuration"}, {
      status: 500,
    });
  });
}

export async function POST(request: Request) {
  logger.info("POST /api/ambilight");
  const req = await request.json();
  if (!!req.power) {
    logger.info("Setting power to " + req.power);
    return await philipsAPI.setAmbilightPower(req.power).then((res: any) => {
      logger.info("Ambilight power set to:" + req.power + res.data);
      return NextResponse.json({status: "OK"}, {
        status: 200,
      });
    }).catch((error:any) => {
      logger.error("Failed to set ambilight power" + error);
      return NextResponse.json({error: "Failed to set ambilight power"}, {
        status: 500,
      });
    });
  }

  return await philipsAPI.setAmbilight(req.styleName, req.menuSetting).then((res) => {
    logger.info("Ambilight set" + res.data);
    return NextResponse.json({status: "OK"}, {
      status: 200,
    });
  }).catch((error) => {
    logger.error("Failed to set ambilight" + error);
    return NextResponse.json({error: "Failed to set ambilight"}, {
      status: 500,
    });
  });
}
