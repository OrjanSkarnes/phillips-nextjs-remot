import axios from "axios";
import {Logger} from "./logger";
const find = require('local-devices');

export class PhilipsAPI {
  private TV_IP = process.env.TV_IP // Is set in .env file
  private TV_PORT = 1925 // Is either 1925(Non Android) or 1926 (Android)
  private logger: Logger;

  private maxAttempts = 3;
  private requestTimeout = 5000; // 5 seconds

  constructor() {
    this.logger = new Logger();
  }

  public async findTV() {
    const devices = await find();
    // Go through all devices and check if they get response from /powerstate
    for (const device of devices) {
      const url = `http://${device.ip}:${this.TV_PORT}/6/powerstate`;
      try {
        const response = await axios.get(url, {timeout: this.requestTimeout});
        if (response.status === 200) {
          this.TV_IP = device.ip;
          this.logger.info(`Found TV at ${this.TV_IP}`);
          return;
        }
      } catch (error: any) {
        // Do nothing
      }
    }
  }

  public async sendKey(key: string) {
    this.logger.info(`Sending key: ${key}`);
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/input/key`;
    const payload = { key };
    try {
      return await axios.post(url, payload, {
        timeout: this.requestTimeout,
      });
    } catch (error: any) {
      this.findTV();
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
      // If we get a timeout, try to find tv on network
      return {status: 500, data: 'Failed to get powerstate, timout exceeded'};
    });
  }

  public async getAmbilightConfiguration() {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/ambilight/currentconfiguration`;
    return axios.get(url).then(
      (response) => {
        return response?.data;
      }
    ).catch((error) => {
      return {status: 500, data: 'Failed to get ambilight configuration, timout exceeded'};
    });
  }

  public async getCurrentVolume() {
    const url = `http://${this.TV_IP}:${this.TV_PORT}/6/audio/volume`;
    // Fetch powerstate from TV
    return axios.get(url).then(
      (response) => {
        return response?.data;
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
