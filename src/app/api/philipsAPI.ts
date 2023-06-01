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
      return response;
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

  public async getCurrentVolume() {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/audio/volume`;
    // Fetch powerstate from TV
    return axios.get(url).then(
      (response) => {
        return response?.data?.current;
      }
    ).catch((error) => {
      return {status: 500, data: 'Failed to get volume, timout exceeded'};
    });
  }

  public async setAmbilight(style: string, setting: string) {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/ambilight/currentconfiguration`;
    const payload = {
      styleName: style,
      isExpert: false,
      menuSetting: setting,
    };

    this.logger.debug(JSON.stringify(payload))
    this.logger.info(`Setting ambilight to ${style} ${setting}`);
    return await axios.post(url, payload, {
      timeout: this.requestTimeout,
    });
  }

  public async setAmbilightPower(power: string) {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/ambilight/power`;
    const payload = {
      power: power,
    };

    this.logger.info(`Setting ambilight power to ${power}`);
    return await axios.post(url, payload, {
      timeout: this.requestTimeout,
    });
  }
}

export const philipsAPI = new PhilipsAPI();
