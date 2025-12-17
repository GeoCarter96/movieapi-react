import Landing from "./components/Landing/Landing";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";








const App = () => {
  return (
    <div>
    <Router>
    <Routes>
   <Route path="/" element={<Home/>}/>
      <Route path="/movies" element={<Landing/>} />
    </Routes>
    </Router>
     </div>
)
}

export default App
