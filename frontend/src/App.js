import BuyerCardAdd from "./components/buyerCardAdd";
import AllBuyerCards from "./components/allBuyerCards";
import UpdatebuyerCard from "./components/updatebuyerCard";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/yeildCard/add" exact element={<BuyerCardAdd />} />
          <Route path="/yeildCard/" exact element={<AllBuyerCards />} />
          <Route path="/yeildCard/:id" exact element={<UpdatebuyerCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
