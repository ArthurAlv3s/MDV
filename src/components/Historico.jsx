import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageCircle />, path: "/chatbot" },
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

const mainColor = "#1E293B";
const accentColor = "#38BDF8";
const bgLight = "#F1F5F9";

export default function Historico() {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: bgLight, color: mainColor }}
    >
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "w-64" : "w-16"
        } p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:opacity-80"
          >
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

      {/* Conteúdo principal */}
      <main className="flex-1">

          <div className="">

          <header className={`flex items-center p-4 shadow-md border-b bg-[${mainColor}] border-gray-700`}>
        <div className="flex-1"></div>

        <div className="flex-1 flex justify-center">
          <img src="/arvore.png" alt="Logo" className="h-20 w-auto" />
        </div>

        <div className="flex-1 flex justify-end items-center space-x-5">
          <a href="./" className="text-white">Quer ser um patrocinador?</a>
          <a href="./" className="text-white">Quer ser um Tutor?</a>
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-2 rounded font-semibold hover:brightness-110`}
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            Login
          </button>
        </div>
      </header>

          </div>
          <div className="p-6">

          <h1 className="text-2xl font-bold mb-6 p-6">Histórico de Vídeos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historicoVideos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
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
                  style={{ backgroundColor: accentColor }}
                >
                  Assistir novamente
                </button>
              </div>
            </div>
          ))}
        </div>

          </div>

        
      </main>
    </div>
  );
}
