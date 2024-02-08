import React, { useState } from 'react';

function SliderComponent({ onSliderChange, onContrastChange, onEpsiChange }) {
  const [sliderValue, setSliderValue] = useState(10); // Default value
  const [contrastValue, setContrastValue] = useState(1); // Default value for contrast slider
  const [epsiValue, setEpsiValue] = useState(1); // Default EPSI value
  const [isEpsiOn, setIsEpsiOn] = useState(false); // Default EPSI state


  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onSliderChange(newValue, contrastValue);
  };

  const handleContrastChange = (event) => {
    const newContrastValue = parseFloat(event.target.value);
    setContrastValue(newContrastValue);
    onContrastChange(sliderValue, newContrastValue);
  };

  const handleEpsiChange = (event) => {
    const newEpsiValue = parseInt(event.target.value);
    setEpsiValue(newEpsiValue);
    onEpsiChange(newEpsiValue);
  };

  return (
    <div className="slider-container">
      <h2>Image Slice</h2>
      <input
        type="range"
        min="1"
        max={20}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p>Slider Value: {sliderValue}</p>

      <h2>Contrast</h2>
      <input
        type="range"
        min="0.1"
        max="2.5"
        step="0.1"
        value={contrastValue}
        onChange={handleContrastChange}
      />
      <p>Contrast Value: {contrastValue}</p>

      <h2>EPSI Dataset</h2>
      <input
        type="range"
        min="0"
        max={17}
        value={epsiValue}
        onChange={handleEpsiChange}
      />
      <p>EPSI Value: {epsiValue}</p>

      <button onClick={() => setIsEpsiOn(!isEpsiOn)}>
        {isEpsiOn ? "EPSI OFF" : "EPSI ON"}
      </button>
    </div>
  );
}

export default SliderComponent; 