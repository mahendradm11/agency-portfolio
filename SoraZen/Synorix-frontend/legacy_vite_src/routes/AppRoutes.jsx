import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ServicesPage from "../pages/Services";
import ProjectsPage from "../pages/Projects";
import Contact from "../pages/Contact";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}