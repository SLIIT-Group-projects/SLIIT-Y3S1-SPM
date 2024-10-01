import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import './index.css'
import 'flowbite';
import Home from "./components/ui/Home";
import PlantCount from "./components/ui/PlantCount"
import AddDimentions from "./components/ui/AddDimentions";
import HistoryPlantCount from "./components/ui/HistoryPlantCount";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element = {<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path= "/PlantCount" element = {<PlantCount/>}/>
      <Route path= "/HistoryPlantCount" element = {<HistoryPlantCount/>}/>
      <Route path= "/admin/addDimentions" element = {<AddDimentions/>}/>
    </Routes>
    

    </BrowserRouter>
    </>
      
  )
}

export default App
