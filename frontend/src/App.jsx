import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import "flowbite";
import Home from "./components/ui/Home";
import PlantCount from "./components/ui/PlantCount";
import AddDimentions from "./components/ui/AddDimentions";
import HistoryPlantCount from "./components/ui/HistoryPlantCount";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import PlantShopList from "./components/ui/PlantShopList";
import AdminAddPlantShop from "./components/ui/AddShopsAdmin";

// sajitha
import Rent_home from "./pages/Rent_home";
import Index_page from "./pages/Tool_home";
import Tool_view from "./pages/Tool_view";
import ToolForm from "./pages/Rent_create";
import Tool_bookings from "./pages/Tool_bookings";
import Tool_booking from "./pages/Tool_booking";
import Rent_bookings from "./pages/Rent_bookings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/PlantCount" element={<PlantCount />} />
          <Route path="/HistoryPlantCount" element={<HistoryPlantCount />} />
          <Route path="/admin/addDimentions" element={<AddDimentions />} />
          <Route path="/admin/addShopsAdmin" element={<AdminAddPlantShop />} />
          <Route path="/plantShopList/:plantName" element={<PlantShopList />} />

          {/* //daham */}
          <Route path="/rent" element={<Index_page />} />
          <Route path="/rent_admin_home" element={<Rent_home />} />
          <Route path="/rent_create" element={<ToolForm />} />
          <Route path="/tools/:id" element={<ToolForm />} />
          <Route path="/tools_home/:id" element={<Tool_view />} />
          <Route path="/booking" element={<Tool_bookings />} />
          <Route path="/booking/:id" element={<Tool_booking />} />
          <Route path="/tools/:toolId/bookings" element={<Rent_bookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
