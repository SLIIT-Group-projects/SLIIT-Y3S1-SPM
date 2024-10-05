import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FertilizerOrderPage from "./pages/FertilizerOrderPage";
import DeleteFertilizerPage from "./pages/DeleteFertilizerPage";
import AdminFertilizerPage from "./pages/AdminFertilizerPage";
import UpdateFertilizerPage from "./pages/UpdateFertilizerPage";
import CreateFertilizer from "./pages/CreateFertilizer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/order" element={<FertilizerOrderPage />} />
        <Route path="/delete/:id" element={<DeleteFertilizerPage />} />
        <Route path="/adminfer" element={<AdminFertilizerPage />} />
        <Route path="/update/:id" element={<UpdateFertilizerPage />} />
        <Route path="/add-fer" element={<CreateFertilizer />} />
      </Routes>
    </Router>
  );
};
export default App;
