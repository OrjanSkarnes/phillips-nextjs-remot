"use client";

import axios from "axios";
import AmbilightDropdown from "./AmbilightDropdowns";
import {useEffect, useState} from "react";

const TVRemote = () => {
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // On startup, get the current volume and mute state
  useEffect(() => {
    getVolume();
  }, []);

  async function handleButtonClick(command: string) {
    const response = await axios.post(`/api/key`, {command});
    if (command === "VolumeUp" || command === "VolumeDown" || command === "Mute") {
      // Wait for the volume to change before updating the volume state
      setTimeout(() => {getVolume();}, 500);
    }
  }

  async function getVolume() {
    const response = await axios.get(`/api/volume`);
    setCurrentVolume(response.data.volume);
    setIsMuted(response.data.muted);
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
        <button onClick={() => handleButtonClick("Source")}><span className="source-button"></span></button>
        {/* <button onClick={() => handleButtonClick("Options")}><span className="settings-button"></span></button> */}
      </div>

      <div className="middle-row">
        <div className="volume-control">
          <button onClick={() => handleButtonClick("VolumeDown")}><span className="minus-button"></span></button>
          <div className="progress-bar" onClick={() => handleButtonClick("Mute")} >
            <div className={"progress " + (isMuted? 'muted' : '')} style={{ width: `${currentVolume}%` }}></div>
          </div>
          <button onClick={() => handleButtonClick("VolumeUp")}><span className="plus-button"></span></button>
        </div>
      </div>
      <div className="bottom-row">
        <button onClick={() => handleButtonClick("AmbilightOnOff")}><span className="light-button"></span></button>
        <AmbilightDropdown/>
        </div>
    </div>
  );
};

export default TVRemote;

