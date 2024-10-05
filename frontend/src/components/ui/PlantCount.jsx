// src/components/PlantCount.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; // Correct default import
import PlantNavBar from "../shared/PlantNavBar";
import draw1 from "../../assets/draw1.png";
import draw2 from "../../assets/draw2.png";
import draw3 from "../../assets/draw3.png";
import image1 from "../../assets/image1.png";
import "flowbite"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PlantCount() {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [area, setArea] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantDimension, setPlantDimension] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantCount, setPlantCount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // User state variables
  const [userId, setUserId] = useState(null);

  const slides = [image1, draw1, draw2, draw3];
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Get user ID from token
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging: log the token

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debugging: log the decoded token
        setUserId(decodedToken.id); // Use 'id' instead of 'userId'
        console.log("User ID set:", decodedToken.id); // Debugging
      } catch (error) {
        console.error("Token decoding error:", error); // Catch decoding errors
      }
    } else {
      console.warn("No token found in localStorage"); // Warn if no token is found
    }

    // Fetch plants from API
    axios
      .get("http://localhost:8070/plant") // Updated port
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

    return () => clearInterval(interval);
  }, [slides.length]);

  const calculateArea = (e) => {
    e.preventDefault();
    const widthValue = parseFloat(width);
    const lengthValue = parseFloat(length);

    console.log("Width:", widthValue, "Length:", lengthValue); // Debug log

    if (!isNaN(widthValue) && !isNaN(lengthValue)) {
      const calculatedArea = widthValue * lengthValue;
      setArea(calculatedArea);
      console.log("Calculated Area:", calculatedArea); // Debug log

      if (plantDimension) {
        const plantArea = parseFloat(plantDimension);
        if (!isNaN(plantArea) && plantArea > 0) {
          const count = Math.floor(calculatedArea / plantArea);
          setPlantCount(count);
          console.log("Plant Count:", count); // Debug log
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
      console.log("Selected Plant:", selectedPlant); // Debug log
    }
  };

  const saveToHistory = () => {
    console.log("Selected Plant:", selectedPlant);
    console.log("Area:", area);
    console.log("Plant Count:", plantCount);
    console.log("User ID:", userId);
    if (!selectedPlant || !area || plantCount === null || !userId) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const historyData = {
      userId,
      plantName: selectedPlant.plantName,
      width,
      length,
      area,
      plantCount,
    };

    console.log("History Data to Save:", historyData);
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8070/planthistory/add", historyData, { // Updated port
        headers: {
          Authorization: `Bearer ${token}`, // Add this line
        },
      })
      .then((res) => {
        alert("Data saved to history successfully!");
        // Optionally, reset the form
        setWidth("");
        setLength("");
        setArea(null);
        setPlantCount(null);
        setSelectedPlant(null);
        setPlantDimension(null);
      })
      .catch((err) => {
        console.error("Error saving to history:", err.message);
        alert("Error saving to history: " + err.message);
      });
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleViewShops = () => {
    if (!selectedPlant) {
      alert("Please select a plant first.");
      return;
    }
    navigate(`/plantShopList/${selectedPlant.plantName}`); 
  };

  return (
    <div>
      <PlantNavBar />
      <div className="flex justify-center items-center h-16">
        <div className="text-[#6A9C89] text-3xl font-bold">
          CALCULATE PLANT COUNT
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <form onSubmit={calculateArea} className="w-full mx-auto ml-20">
            <div className="mb-5">
              <label htmlFor="width" className="block mb-2 text-sm font-medium">
                Enter the width (m)
              </label>
              <input
                type="number" // Changed to number for validation
                step="0.01"
                id="width"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="length"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter the length (m)
              </label>
              <input
                type="number" // Changed to number for validation
                step="0.01"
                id="length"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="plantSelect"
                className="block mb-2 text-sm font-medium"
              >
                Choose the plant
              </label>
              <select
                className="border text-sm rounded-lg block w-full p-2.5"
                id="plantSelect"
                onChange={handlePlantSelection}
                value={selectedPlant ? selectedPlant._id : ""}
                required
              >
                <option value="">Choose...</option>
                {plants.map((plant) => (
                  <option value={plant._id} key={plant._id}>
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
              The area of the land is: {area} square meters
            </div>
          )}
          {plantCount !== null && (
            <div
              className="alert alert-info mt-3 ml-20 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Info:</strong>
              <span className="block sm:inline">
                You can plant approximately {plantCount}{" "}
                {selectedPlant?.plantName}(s) in the given area.
              </span>
            </div>
          )}

          <button
            className="text-white bg-[#6A9C89] hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 ml-20"
            onClick={saveToHistory}
          >
            Save to History
          </button>

          {/* Add View Shops Button */}
          {plantCount !== null && (
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-3 ml-20"
              onClick={handleViewShops}
            >
              View Shops with {selectedPlant?.plantName}
            </button>
          )}
        </div>

        <div className="w-1/2 mr-20">
          <div className="relative w-full h-56 overflow-hidden rounded-lg md:h-96">
            <img
              src={slides[currentSlide]}
              className="block w-full h-full object-cover"
              alt={`Slide ${currentSlide + 1}`}
            />

            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              onClick={goToPrevSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-white bg-black rounded-full opacity-60 hover:opacity-100">
                &#9664;
              </span>
            </button>

            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              onClick={goToNextSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-white bg-black rounded-full opacity-60 hover:opacity-100">
                &#9654;
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCount;
