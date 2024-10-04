// Rent_home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppNavbar from "../components/NavBar";
import ToolUploadButton from "../components/ToolUploadButton";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const Rent_home = () => {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  useEffect(() => {
    axios.get("http://localhost:8070/tools").then(({ data }) => {
      setTools(data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      axios
        .delete(`http://localhost:8070/tools/${id}`)
        .then((res) => {
          setTools((prev) => prev.filter((tool) => tool._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    }
  };

  // Filter tools based on search query
  const filteredTools = tools.filter((tool) =>
    tool.tool_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AppNavbar />
      <div className="flex ">
        <ToolUploadButton />
        <div className="ml-auto">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool._id}
              className="flex flex-col cursor-pointer bg-[#E9EFEC] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64 bg-[#C4DAD2] flex items-center justify-center rounded-lg overflow-hidden mb-4">
                {tool.tool_photos.length > 0 ? (
                  <Link to={`/tools/${tool._id}`}>
                    <img
                      src={`http://localhost:8070/uploads/${tool.tool_photos[0]}`}
                      alt={tool.tool_title}
                      className="object-cover w-full h-full absolute top-0 left-0"
                      style={{ objectFit: "cover", aspectRatio: "16/9" }}
                    />
                  </Link>
                ) : (
                  <p className="text-[#16423C] text-sm">No Image</p>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#16423C]">
                  {tool.tool_title}
                </h2>
                <p className="text-md text-[#6A9C89] mt-2">
                  {tool.tool_description}
                </p>
              </div>
              <button
                onClick={() => handleDelete(tool._id)}
                className="flex gap-2 bg-red-500 rounded text-white p-2 ml-auto my-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Remove Item
              </button>
            </div>
          ))
        ) : (
          <p>No tools found.</p>
        )}
      </div>
    </>
  );
};

export default Rent_home;
