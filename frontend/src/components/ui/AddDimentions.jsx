import React, { useState } from "react";
import axios from "axios";
import PlantNavBar from "../shared/PlantNavBar";
import AdminHeader from "../shared/AdminHeader";

function AddDimensions() {
  const [plantName, setPlantName] = useState("");
  const [requiredDimension, setRequiredDimension] = useState("");
  const [fertilizers, setFertilizers] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Fix typo

    // Assuming fertilizers are input as a comma-separated string
    const fertilizersArray = fertilizers.split(",").map(f => f.trim());

    const newPlant = {
      plantName,
      requiredDimension,
      fertilizers: fertilizersArray,
    };

    axios.post("http://localhost:3000/plant/add", newPlant)
      .then((res) => {
        setSuccessMessage("New plant dimensions added successfully.");
        setErrorMessage(""); // Clear error message if successful
      })
      .catch((err) => {
        setErrorMessage("Error creating new plant log: " + err.message);
        setSuccessMessage(""); // Clear success message if error occurs
      });
  };

  return (
    <div className="">
      <PlantNavBar />
      <AdminHeader/>
      <div className="my-20 mx-20">
        {/* Form Start */}
        <div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label htmlFor="plantName" className="block mb-2 text-sm font-medium">
                Enter Plant Name
              </label>
              <input
                type="text"
                id="plantName"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Plant name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="requiredDimension"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Required Dimension
              </label>
              <input
                type="text"
                id="requiredDimension"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Dimension in meters"
                value={requiredDimension}
                onChange={(e) => setRequiredDimension(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fertilizers"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Fertilizers that can be used
              </label>
              <input
                type="text"
                id="fertilizers"
                className="border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Fertilizers that can be used (comma separated)"
                value={fertilizers}
                onChange={(e) => setFertilizers(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>

            {successMessage && (
              <div className="mt-5 p-4 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-5 p-4 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDimensions;
