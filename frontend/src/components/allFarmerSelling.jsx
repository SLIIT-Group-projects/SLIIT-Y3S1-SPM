import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/yeildCss.css"; // Adjust paths based on your file structure
import "../css/main.css"; // Adjust paths based on your file structure

const CropSellingTable = () => {
  const [cropData, setCropData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch crop data from the API
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/yeildCard/crop_selling/");
        setCropData(response.data);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCropData();
  }, []);

  return (
    <div className="crop-selling-table mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Crop Selling Details</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 mt-4">
            <thead className="bg-[#065f46] text-white">
              <tr>
                <th className="border border-gray-300 p-3">Buyer Card ID</th>
                <th className="border border-gray-300 p-3">Title</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Buyer ID</th>
                <th className="border border-gray-300 p-3">Buyer Name</th>
                <th className="border border-gray-300 p-3">Buying Rate</th>
                <th className="border border-gray-300 p-3">Selling Quantity</th>
                <th className="border border-gray-300 p-3">Farmer ID</th>
                <th className="border border-gray-300 p-3">Farmer Name</th>
              </tr>
            </thead>
            <tbody>
              {cropData.map((crop, index) => (
                <tr
                  key={crop._id}
                  className={`border-b border-gray-300 ${
                    index % 2 === 0 ? "" : "bg-[#dcfce7]"
                  } hover:bg-[#dcfce7] transition-colors duration-200`}
                >
                  <td className="border border-gray-300 p-2">{crop.buyer_card_ID}</td>
                  <td className="border border-gray-300 p-2">{crop.b_title}</td>
                  <td className="border border-gray-300 p-2">{crop.b_description}</td>
                  <td className="border border-gray-300 p-2">{crop.buyer_id}</td>
                  <td className="border border-gray-300 p-2">{crop.buyer_name}</td>
                  <td className="border border-gray-300 p-2">{crop.buying_rate}</td>
                  <td className="border border-gray-300 p-2">{crop.selling_quantity}</td>
                  <td className="border border-gray-300 p-2">{crop.farmer_id}</td>
                  <td className="border border-gray-300 p-2">{crop.farmer_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CropSellingTable;
