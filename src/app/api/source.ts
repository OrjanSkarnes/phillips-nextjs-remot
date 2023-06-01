// pages/api/switch_source_right.js
import { NextApiRequest, NextApiResponse } from "next";
import { philipsAPI } from "./philipsAPI";
import { logger } from "./logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Switching source right");
  logger.info("Switching source right" + req.body);

  try {
    // logger.info("Switching source right" + req.body);
    await philipsAPI.sendKey("Source");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for the source menu to open
    await philipsAPI.sendKey("CursorRight");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for the selection to move
    await philipsAPI.sendKey("Confirm");

    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Failed to switch source right" });
  }
}
