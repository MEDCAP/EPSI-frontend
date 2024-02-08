import React, { useState } from 'react';
import './App.css';
import SliderComponent from './components/SliderComponent';
import PlotComponent from './components/PlotComponent';

function App() {
  const [imageURL, setImageURL] = useState('');
  const [epsiData, setEpsiData] = useState({
    xEpsi: [],
    epsi: [],
    columns: 0,
    spectralData: [],
    rows: 0,
  });

  const handleSliderChange = (newValue, contrastValue) => {
    sendSliderValueToBackend(newValue, contrastValue);
  };

  const handleContrastChange = (sliderValue, newContrastValue) => {
    sendSliderValueToBackend(sliderValue, newContrastValue);
  };

  const handleEpsiChange = (newEpsiValue) => {
    sendEpsiValueToBackend(newEpsiValue);
  };

  const sendSliderValueToBackend = (newValue, newContrastValue) => {
    fetch(`http://127.0.0.1:5000/api/get_proton_picture/${newValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contrast: newContrastValue }),
    })
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageURL = URL.createObjectURL(imageBlob);
        setImageURL(imageURL);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const sendEpsiValueToBackend = (newEpsiValue) => {
    // Send the EPSI value to the backend
    fetch(`http://127.0.0.1:5000/api/get_epsi_data/${newEpsiValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the EPSI-related data
        setEpsiData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <SliderComponent
        onSliderChange={handleSliderChange}
        onContrastChange={handleContrastChange}
        onEpsiChange={handleEpsiChange}
      />

      <PlotComponent
        xEpsi={epsiData.xEpsi}
        epsi={epsiData.epsi}
        columns={epsiData.columns}
        spectralData={epsiData.spectralData}
        rows={epsiData.rows}
      />
      <div className="image-and-plot-container">
        <img src={imageURL} alt="Proton" className="proton-image" />
        <div id="epsi-plot" className="epsi-plot"></div>
      </div>
    </div>
  );
}

export default App;