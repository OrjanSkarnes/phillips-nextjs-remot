import React, { ChangeEvent, useState } from "react";
import axios from "axios";

type AmbilightSetting = {
  styleName?: string;
  power?: string;
  isExpert?: string;
  menuSetting?: string;
  icon?: string;
};

type AmbilightOptions = {
  [key: string]: AmbilightSetting;
};

const ambilightOptions: AmbilightOptions = {
  ambilight_on: {
    power: "On",
  },
  ambilight_off: {
    power: "Off",
  },
  ambilight_video_standard: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "STANDARD",
  },
  ambilight_video_natural: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "NATURAL",
  },
  ambilight_video_vivid: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "VIVID",
  },
  ambilight_video_game: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "GAME",
  },
  ambilight_video_comfort: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "COMFORT",
  },
  ambilight_video_relax: {
    styleName: "FOLLOW_VIDEO",
    isExpert: "false",
    menuSetting: "RELAX",
  },
  ambilight_audio_adapt_brightness: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "ENERGY_ADAPTIVE_BRIGHTNESS",
  },
  ambilight_audio_adapt_colors: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "ENERGY_ADAPTIVE_COLORS",
  },
  ambilight_audio_vu_meter: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "VU_METER",
  },
  ambilight_audio_spectrum: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "SPECTRUM_ANALYZER",
  },
  ambilight_audio_knight_rider_1: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "KNIGHT_RIDER_CLOCKWISE",
  },
  ambilight_audio_knight_rider_2: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "KNIGHT_RIDER_ALTERNATING",
  },
  ambilight_audio_flash: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "RANDOM_PIXEL_FLASH",
  },
  ambilight_audio_strobo: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "STROBO",
  },
  ambilight_audio_party: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "PARTY",
  },
  ambilight_audio_random: {
    styleName: "FOLLOW_AUDIO",
    isExpert: "false",
    menuSetting: "MODE_RANDOM",
  },
  ambiligt_color_hot_lava: {
    styleName: "FOLLOW_COLOR",
    isExpert: "false",
    menuSetting: "HOT_LAVA",
    },
    ambilight_color_warm_white: {
        styleName: "FOLLOW_COLOR",
        isExpert: "false",
        menuSetting: "ISF",
    },
    ambilight_color_cool_white: {
        styleName: "FOLLOW_COLOR",
        isExpert: "false",
        menuSetting: "PTA_LOUNGE",
    },
    ambilight_color_fresh_nature: {
        styleName: "FOLLOW_COLOR",
        isExpert: "false",
        menuSetting: "FRESH_NATURE",
    },
    ambilight_color_deep_water: {
        styleName: "FOLLOW_COLOR",
        isExpert: "false",
        menuSetting: "DEEP_WATER",
      },
};

const AmbilightDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    const option: AmbilightSetting = ambilightOptions[event.target.value];
    if (option) {
      const response =  await axios.post(`/api/ambilight`, {
        styleName: option.styleName,
        power: option.power,
        isExpert: option.isExpert,
        menuSetting: option.menuSetting,
      });
    }
  };

  const selectedIcon = selectedOption && ambilightOptions[selectedOption].icon;


  return (
    <>  
    <select value={selectedOption} className="dropdown" onChange={handleChange}>
      {Object.keys(ambilightOptions).map((option) => (
        <option key={option} value={option} className="dropdown-content">
          {option.replace('ambilight_', '').replace(/_/g, ' ').toUpperCase()}
        </option>
      ))}
    </select>
    </>
  );
};

export default AmbilightDropdown;
