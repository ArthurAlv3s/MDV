import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contextos
import { ThemeProvider } from "./components/ThemeContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";

// Páginas
import LandingPage from "./components/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";    
import Tutoriais from "./components/Tutoriais.jsx";    
import Mp from "./components/Minhas Playlists";
import Ct from "./components/Chatbot.jsx";
import Historico from "./components/Historico.jsx";
import Feedback from "./components/Feedback.jsx";
import Config from "./components/Configuracao.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tutoriais" element={<Tutoriais />} />
            <Route path="/playlists" element={<Mp />} />
            <Route path="/chatbot" element={<Ct />} />
            <Route path="/historico" element={<Historico />} />  
            <Route path="/feedback" element={<Feedback />} />  
            <Route path="/config" element={<Config />} />  
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
