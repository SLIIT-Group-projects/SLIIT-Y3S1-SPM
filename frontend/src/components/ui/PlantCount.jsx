import React, { useEffect, useState } from "react";
import axios from "axios";
import PlantNavBar from "../shared/PlantNavBar";
import draw1 from "../../assets/draw1.png";
import draw2 from "../../assets/draw2.png";
import draw3 from "../../assets/draw3.png";
import image1 from "../../assets/image1.png";
import "flowbite"; // Ensure Flowbite is imported

function PlantCount() {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [area, setArea] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantDimension, setPlantDimension] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantCount, setPlantCount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const slides = [image1, draw1, draw2, draw3];

  useEffect(() => {
    axios
      .get("http://localhost:3000/plant")
      .then((res) => {
        setPlants(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    // Auto slide change every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  // Function to calculate the area
  const calculateArea = (e) => {
    e.preventDefault();
    const widthValue = parseFloat(width);
    const lengthValue = parseFloat(length);

    if (!isNaN(widthValue) && !isNaN(lengthValue)) {
      const calculatedArea = widthValue * lengthValue;
      setArea(calculatedArea);

      if (plantDimension) {
        const plantArea = parseFloat(plantDimension);
        if (!isNaN(plantArea) && plantArea > 0) {
          const count = Math.floor(calculatedArea / plantArea);
          setPlantCount(count);
        }
      }
    } else {
      alert("Please enter valid numbers for width and length");
    }
  };

  const handlePlantSelection = (e) => {
    const plantId = e.target.value;
    const selectedPlant = plants.find((plant) => plant._id === plantId);
    setSelectedPlant(selectedPlant);

    if (selectedPlant) {
      setPlantDimension(selectedPlant.requiredDimension);
    }
  };

  // Save to history function
  const saveToHistory = () => {
    if (!selectedPlant || !area || plantCount === null) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const historyData = {
      plantName: selectedPlant.plantName,
      width,
      length,
      area,
      plantCount,
    };

    axios
      .post("http://localhost:3000/planthistory/add", historyData)
      .then((res) => {
        alert("Data saved to history successfully!");
      })
      .catch((err) => {
        alert("Error saving to history: " + err.message);
      });
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="">
      <PlantNavBar />
      <div className="flex justify-center items-center h-16">
        <div className="text-[#6A9C89] text-3xl font-bold">
          CALCULATE PLANT COUNT
        </div>
      </div>
      
      <div className="flex justify-between ">
        {/* Form Start */}
        <div>
          <form onSubmit={calculateArea} className="w-full mx-auto ml-20">
            <div className="mb-5">
              <label htmlFor="width" className="block mb-2 text-sm font-medium">
                Enter the width (m)
              </label>
              <input
                type="text"
                id="width"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900">
                Enter the length (m)
              </label>
              <input
                type="text"
                id="length"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="plantSelect" className="block mb-2 text-sm font-medium">
                Choose the plant 
              </label>
              <select
                className="border text-sm rounded-lg block w-full p-2.5"
                id="plantSelect"
                onChange={handlePlantSelection}
                required
              >
                <option value="">Choose...</option>
                {plants.map((plant, i) => (
                  <option value={plant._id} key={i}>
                    {plant.plantName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="text-white bg-[#6A9C89] hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>

          {area && (
            <div className="mt-5 p-4 bg-[#C4DAD2] text-black rounded ml-20">
              The area of the land is: {area} square units
            </div>
          )}
          {plantCount !== null && (
            <div className="alert alert-info mt-3 ml-20">
              You can plant approximately {plantCount} {selectedPlant?.plantName}(s) in the given area.
            </div>
          )}

          {/* Save to history button */}
          <button
            className="text-white bg-[#6A9C89] hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 ml-20"
            onClick={saveToHistory}
          >
            Save to History
          </button>
        </div>

        {/* Carousel */}
        <div className="w-1/2 mr-20">
          <div className="relative w-full h-56 overflow-hidden rounded-lg md:h-96 ">
            <img
              src={slides[currentSlide]}
              className="block w-full h-full object-cover"
              alt={`Slide ${currentSlide + 1}`}
            />

            {/* Prev/Next controls */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              onClick={goToPrevSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              onClick={goToNextSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCount;
