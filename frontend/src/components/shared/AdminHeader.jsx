import React from "react";
import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      {/* Header Title */}
      <div className="text-[#6A9C89] text-5xl font-bold mb-4">
        ADMIN DASHBOARD
      </div>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <Link to="/admin/addDimentions">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            Plant Dimensions
          </button>
        </Link>
        <Link to="/admin/addShopsAdmin">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            Manage Shops
          </button>
        </Link>
        <Link to="/rent_create">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            Manage Tools
          </button>
        </Link>
        <Link to="/view-orders">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            View Orders
          </button>
        </Link>
        <Link to="/analytics">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            Analytics
          </button>
        </Link>
        <Link to="/settings">
          <button className="bg-[#6A9C89] text-white px-4 py-2 rounded hover:bg-[#558270]">
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminHeader;
