import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Rent_home from "./pages/Rent_home";
import Index_page from "./pages/Tool_home";
import Tool_view from "./pages/Tool_view";
import ToolForm from "./pages/Rent_create";
import Tool_bookings from "./pages/Tool_bookings";
import Tool_booking from "./pages/Tool_booking";
import Rent_bookings from "./pages/Rent_bookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index_page />} />
        <Route path="/rent_admin_home" element={<Rent_home />} />
        <Route path="/rent_create" element={<ToolForm />} />
        <Route path="/tools/:id" element={<ToolForm />} />
        <Route path="/tools_home/:id" element={<Tool_view />} />
        <Route path="/booking" element={<Tool_bookings />} />
        <Route path="/booking/:id" element={<Tool_booking />} />
        <Route path="/tools/:toolId/bookings" element={<Rent_bookings />} />
      </Routes>
    </Router>
  );
}

export default App;
