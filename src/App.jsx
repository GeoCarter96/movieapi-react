import Landing from "./components/Landing/Landing";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";









const App = () => {
  return (
    <div>
    <Router>
    <Routes>
   <Route path="/" element={<Home/>}/>
      <Route path="/movies" element={<Landing/>} />
    </Routes>
    <Footer/>
    </Router>
     </div>
)
}

export default App
