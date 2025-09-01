import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

const historicoVideos = [
  {
    titulo: "Introdução ao React",
    img: "https://img.youtube.com/vi/Tn6-PIqc4UM/maxresdefault.jpg",
    tempo: "12:34 assistidos",
  },
  {
    titulo: "Entendendo o Tailwind CSS",
    img: "https://img.youtube.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
    tempo: "20:10 assistidos",
  },
  {
    titulo: "Guia rápido de Vite",
    img: "https://img.youtube.com/vi/U4ja6HeBm6s/maxresdefault.jpg",
    tempo: "05:47 assistidos",
  },
];

export default function Historico() {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  const { palette, changePalette } = useTheme(); // <--- importado do ThemeContext

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: palette.bg, color: palette.text }}>
      
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 flex flex-col h-screen sticky top-0 transition-all duration-300`}
        style={{ backgroundColor: palette.main, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header
          className="flex items-center p-4 shadow-md sticky top-0 z-20"
          style={{ backgroundColor: palette.main }}
        >
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <img
              src="/arvore.png"
              alt="Logo"
              className="h-20 w-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette} // <--- muda a paleta ao clicar
            />
          </div>
          <div className="flex-1 flex justify-end items-center space-x-5">
            <a href="./" className="text-white">Quer ser um patrocinador?</a>
            <a href="./" className="text-white">Quer ser um Tutor?</a>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded font-semibold hover:brightness-110"
              style={{ backgroundColor: palette.accent, color: "#fff" }} // <--- cor dinâmica
            >
              Login
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold mb-6">Histórico de Vídeos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicoVideos.map((video, idx) => (
              <div
                key={idx}
                className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                style={{ backgroundColor: palette.card }} // <--- cor dinâmica dos cards
              >
                <img
                  src={video.img}
                  alt={video.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg">{video.titulo}</h2>
                  <p className="text-sm text-gray-600">{video.tempo}</p>
                  <button
                    className="mt-3 px-3 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: palette.accent }} // <--- cor dinâmica
                  >
                    Assistir novamente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
