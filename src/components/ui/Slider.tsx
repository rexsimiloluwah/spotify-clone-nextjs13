import React from "react";

interface SliderProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({
  value,
  minValue,
  maxValue,
  handleChange,
}) => {
  return (
    <div className="slider__container">
      <div className="slider">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          onChange={handleChange}
        />
        <progress max={maxValue} value={value}></progress>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  minValue: 0,
  maxValue: 100,
};

export default Slider;
