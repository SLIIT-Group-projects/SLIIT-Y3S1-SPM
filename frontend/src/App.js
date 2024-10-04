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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../src/js/home.js'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          
          <Route path="/yeildCard/add" exact element={<BuyerCardAdd />} />
          <Route path="/yeildCard/" exact element={<AllBuyerCards />} />
          <Route path="/yeildCard/:id" exact element={<UpdatebuyerCard />} />
          <Route path="/yeildCard/allBuyerBuying" exact element={<AllBuyerBuying />} />
          <Route path="/yeildCard/FarmersView" exact element={<FarmersView />} />
          <Route path="/yeildCard/FarmersView/:id" exact element={<FarmerAddingForm />} />
          <Route path="/yeildCard/allFarmerSelling" exact element={<AllFarmerSelling />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
