"use client";

import axios from "axios";
import AmbilightDropdown from "./AmbilightDropdowns";
import {useState} from "react";

const TVRemote = () => {
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  async function handleButtonClick(command: string) {
    console.log(`Sending ${command} command to TV`);
    const response = await axios.post(`/api/key`, {command});
    if (command === "VolumeUp" || command === "VolumeDown") {
      setCurrentVolume(response.data.volume);
      setIsMuted(response.data.muted);
    }
  }

  async function getPowerState() {
    await axios.get(`/api/power`);
  }

  async function swapSource(direction: string) {
    await axios.post(`/api/source`, {direction});
  }

  return (
    <div className="tv-remote">
      <div className="top-container">
        <button onClick={() => handleButtonClick("Standby")}><span className="power-button"></span></button>

        <div className="source-control">
          <button onClick={() => swapSource("left")}><span className="prev-source-button"></span></button>
          <button onClick={() => handleButtonClick("Source")}><span className="source-button"></span></button>
          <button onClick={() => swapSource("right")}><span className="next-source-button"></span></button>
        </div>
      </div>

      <div className="navigation-control">
        <button onClick={() => handleButtonClick("CursorUp")}><span className="up"></span></button>
        <button onClick={() => handleButtonClick("CursorLeft")}><span className="left"></span></button>
        <button onClick={() => handleButtonClick("Confirm")}></button>
        <button onClick={() => handleButtonClick("CursorRight")}><span className="right"></span></button>
        <button onClick={() => handleButtonClick("CursorDown")}><span className="down"></span></button>
      </div>

      <div className="home-back-control">
        <button onClick={() => handleButtonClick("Back")}><span className="back-button"></span></button>
        <button onClick={() => handleButtonClick("Home")}><span className="home-button"></span></button>
        <button onClick={() => handleButtonClick("Options")}><span className="settings-button"></span></button>
      </div>

      <div className="middle-row">
        <div className="volume-control">
          <button onClick={() => handleButtonClick("VolumeDown")}><span className="minus-button"></span></button>
          <div className="progress-bar">
            <div className="progress" onClick={() => handleButtonClick("Mute")} style={{ width: `${currentVolume}%` }}></div>
          </div>
          <button onClick={() => handleButtonClick("VolumeUp")}><span className="plus-button"></span></button>
        </div>
      </div>
      <button onClick={() => handleButtonClick("AmbilightOnOff")}>Ambilight Settings</button>
      <AmbilightDropdown/>
    </div>
  );
};

export default TVRemote;
