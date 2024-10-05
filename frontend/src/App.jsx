import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "flowbite";
import PlantCount from "./components/ui/PlantCount";
import AddDimentions from "./components/ui/AddDimentions";
import HistoryPlantCount from "./components/ui/HistoryPlantCount";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import PlantShopList from "./components/ui/PlantShopList";

// daham
import BuyerCardAdd from "./components/buyerCardAdd";
import AllBuyerCards from "./components/allBuyerCards";
import UpdatebuyerCard from "./components/updatebuyerCard";
import AllBuyerBuying from "./components/allBuyerBuying";

import Navbar from "./components/Navbar";
import Home from "./components/home";
import Footer from "./components/footer";

import FarmersView from "./components/farmersView";
import FarmerAddingForm from "./components/farmerAddingForm";
import AllFarmerSelling from "./components/allFarmerSelling";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* daham */}
          <Route path="/" exact element={<Home />} />

          <Route path="/yeildCard/add" exact element={<BuyerCardAdd />} />
          <Route path="/yeildCard/" exact element={<AllBuyerCards />} />
          <Route path="/yeildCard/:id" exact element={<UpdatebuyerCard />} />
          <Route
            path="/yeildCard/allBuyerBuying"
            exact
            element={<AllBuyerBuying />}
          />
          <Route
            path="/yeildCard/FarmersView"
            exact
            element={<FarmersView />}
          />
          <Route
            path="/yeildCard/FarmersView/:id"
            exact
            element={<FarmerAddingForm />}
          />
          <Route
            path="/yeildCard/allFarmerSelling"
            exact
            element={<AllFarmerSelling />}
          />

          {/* siluni */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/PlantCount" element={<PlantCount />} />
          <Route path="/HistoryPlantCount" element={<HistoryPlantCount />} />
          <Route path="/admin/addDimentions" element={<AddDimentions />} />
          <Route path="/plantShopList/:plantName" element={<PlantShopList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
