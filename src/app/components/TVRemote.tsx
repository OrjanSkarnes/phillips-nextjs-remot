"use client";

import axios from "axios";
import AmbilightDropdown from "./AmbilightDropdowns";
import { useState } from "react";

const TVRemote = () => {
  const [currentVolume, setCurrentVolume] = useState<number>(0);

  async function handleButtonClick(command: string) {
    console.log(`Sending ${command} command to TV`);
    const response = await axios.post(`/api/key`, { command });
    if (command === "VolumeUp" || command === "VolumeDown") {
      setCurrentVolume(response.data.volume);
    }
  }

  async function getPowerState() {
    await axios.get(`/api/power`);
  }

  async function swapSource(direction: string) {
    await axios.post(`/api/source`, { direction });
  }

  return (
    <div className="tv-remote">
        <button className="standby" onClick={() => handleButtonClick("Standby")}>Turn off</button>
        
        <div className="navigation-control">
          <button onClick={() => handleButtonClick("CursorUp")}>Up</button>
          <button onClick={() => handleButtonClick("CursorLeft")}>Left</button>
          <button onClick={() => handleButtonClick("Confirm")}>Select</button>
          <button onClick={() => handleButtonClick("CursorRight")}>Right</button>
          <button onClick={() => handleButtonClick("CursorDown")}>Down</button>
        </div>

        <div className="home-back-control">
          <button onClick={() => handleButtonClick("Back")}>Back</button>
          <button onClick={() => handleButtonClick("Home")}>Home</button>
        </div>

        <div className="middle-row">
        <div className="volume-control">
          <button onClick={() => handleButtonClick("VolumeUp")}>Volume Up</button>
          <progress value={currentVolume} max={60}></progress>
      <button onClick={() => handleButtonClick("Mute")}>Mute</button>
          <button onClick={() => handleButtonClick("VolumeDown")}>Volume Down</button>
        </div>
        
        <div className="source-control">
          <button onClick={() => swapSource("left")}>Switch Source Left</button>
          <button onClick={() => handleButtonClick("Source")}>Source</button>
          <button onClick={() => swapSource("right")}>Switch Source Right</button>
        </div>
        </div>
        <button onClick={() => handleButtonClick("AmbilightOnOff")}>Ambilight Settings</button>
        <AmbilightDropdown />
    </div>
  );
};

export default TVRemote;
