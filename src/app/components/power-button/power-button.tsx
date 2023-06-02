// Power button component, should get sent the function that happen when clicking the power button
import './power-button.scss';
import {useState} from "react";

interface FuncProps {
  //here you can declare the return type (here is void)
  handleButtonClick: (values: any) => void;
}

const PowerButton: React.FC<FuncProps> = ({ handleButtonClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    handleButtonClick("Standby");
    setTimeout(() => {
    }, 4000);
    setIsActive(false);

  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  return (
    <div
      className={`power-button ${isActive ? 'active' : ''}`}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick()}>
      <div className="power-button-shape1"></div>
      <div className="power-button-shape2"></div>
      <div className="power-button-shape3"></div>
      <div className="power-button-shape4"></div>
    </div>
  );
}
export default PowerButton;
