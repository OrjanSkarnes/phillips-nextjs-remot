"use client";

import axios from "axios";

const TVRemote = () => {
  async function handleButtonClick(endpoint: string) {
    console.log(`Sending ${endpoint} command to TV`);
    await axios.post(`/api/${endpoint}`);
  }

  async function getPowerState() {
    await axios.get(`/api/power`);
  }

  async function swapSource(direction: string) {
    await axios.post(`/api/source`, { direction });
  }

  return (
    <>
      <div>
        <button onClick={() => getPowerState()}>Power</button>
        <button onClick={() => handleButtonClick("test")}>
          Test
        </button>
        <button onClick={() => swapSource("left")}>
          Switch Source Left
        </button>
        <button onClick={() => swapSource("right")}>
          Switch Source Right
        </button>
        <button onClick={() => handleButtonClick("power")}>Toggle Power</button>
        <button onClick={() => handleButtonClick("ambilight")}>
          Toggle Ambilight
        </button>
      </div>
    </>
  );
};

export default TVRemote;
