// pages/api/power.js
import { NextApiRequest, NextApiResponse } from "next";
import { philipsAPI } from "./philipsAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await philipsAPI.sendKey("Standby");
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle power" });
  }
}
