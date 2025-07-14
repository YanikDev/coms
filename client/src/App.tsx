import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VisitorForm from './pages/VisitorForm';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/visitor" element={<VisitorForm />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
