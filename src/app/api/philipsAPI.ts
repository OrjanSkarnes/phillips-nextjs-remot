import axios from "axios";
import { Logger } from "./logger";

export class PhilipsAPI {
  private TV_IP = "10.0.0.1";
  private TV_PORT = 1925;
  private logger: Logger;

  private maxAttempts = 3;
  private requestTimeout = 5000; // 5 seconds

  constructor() {
    this.logger = new Logger();
  }

  public async sendKey(key: string) {
    this.logger.info(`Sending key: ${key}`);
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/input/key`;
    const payload = { key };
    try {
      const response = await axios.post(url, payload, {
        timeout: this.requestTimeout,
      });
      return response?.status;
    } catch (error: any) {
      return error?.response?.status;
    }
  }

  public async getPowerState() {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/powerstate`;
    // Fetch powerstate from TV
    return axios.get(url).then(
      (response) => {
        return response?.data?.powerstate;
      }
    ).catch((error) => {
      return {status: 500, data: 'Failed to get powerstate, timout exceeded'};
    });
  }
}

export const philipsAPI = new PhilipsAPI();
