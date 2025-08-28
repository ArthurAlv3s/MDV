import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa todas as páginas
import LandingPage from "./components/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";    
import Tutoriais from "./components/Tutoriais.jsx";    
import Mp from "./components/Minhas Playlists"
import Ct from "./components/Chatbot.jsx"
import Historico from "./components/Historico.jsx";
import Feedback from "./components/Feedback.jsx";
import Config from "./components/Configuracao.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tutoriais" element={<Tutoriais />} />
        <Route path="/Playlists" element={<Mp />} />
        <Route path="/chatbot" element={<Ct />} />
        <Route path="/historico" element={<Historico />} />  
        <Route path="/feedback" element={<Feedback />} />  
        <Route path="/config" element={<Config />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
