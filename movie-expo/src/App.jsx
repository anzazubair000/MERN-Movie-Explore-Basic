import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Add from "./Add";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./Detail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>  
        {/* Pass the component as JSX: <Home /> */}
        <Route path="/" element={<Home />} /> 
        <Route path="/movie/:id" element={<Detail />}/>
        <Route path="/add" element={<Add />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;