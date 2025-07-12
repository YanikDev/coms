import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VisitorForm from './pages/VisitorForm';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/visitor" element={<VisitorForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
