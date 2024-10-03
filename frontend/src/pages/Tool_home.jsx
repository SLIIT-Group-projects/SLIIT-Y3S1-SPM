import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../components/NavBar";

const Index_page = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/tools").then((res) => {
      setTools(res.data);
    });
  }, []);

  return (
    <>
      <AppNavbar />
      <div className="m-4 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {tools.length > 0 &&
          tools.map((tool) => (
            <Link
              to={"/tools_home/" + tool._id}
              key={tool._id}
              className="flex flex-col cursor-pointer bg-[#E9EFEC] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64 bg-[#C4DAD2] flex items-center justify-center rounded-lg overflow-hidden mb-4">
                {tool.tool_photos.length > 0 ? (
                  <img
                    src={"http://localhost:8070/uploads/" + tool.tool_photos[0]}
                    alt={tool.tool_title}
                    className="object-cover w-full h-full absolute top-0 left-0"
                    style={{ objectFit: "cover", aspectRatio: "16/9" }}
                  />
                ) : (
                  <p className="text-[#16423C] text-sm">No Image</p>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#16423C]">
                  {tool.tool_title}
                </h2>
                <div className="flex flex-wrap mb-2">
                  {tool.tool_perks.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-[#5A8E74] mt-1 text-white text-xs font-medium mr-2 mb-1 px-2 py-2 rounded"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
                {/* <p className="text-md text-[#6A9C89] mt-2 ">
                  {tool.tool_description}
                </p> */}
                <h2 className="text-xl font-semibold text-[#16423C] text-right">
                  {"Rs. " + tool.tool_price + " per day"}
                </h2>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Index_page;
