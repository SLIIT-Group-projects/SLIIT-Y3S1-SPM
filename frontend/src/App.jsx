import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from "./components/ui/Home";
import PlantCount from "./components/ui/PlantCount"
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element = {<Home/>}/>

      <Route path= "/PlantCount" element = {<PlantCount/>}/>
    </Routes>
    

    </BrowserRouter>
    </>
      
  )
}

export default App
