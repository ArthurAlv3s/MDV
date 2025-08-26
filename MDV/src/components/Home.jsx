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

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/registro");

  const menuItems = [
    { name: "Início", icon: <FiHome /> },
    { name: "Tutoriais", icon: <FiStar /> },
    { name: "Curtidos", icon: <FiClock /> },
    { name: "Minhas Playlists", icon: <FiList /> },
    { name: "Chatbot", icon: <FiMessageCircle /> },
    { name: "Histórico", icon: <FiClock /> },
    { name: "Feedback", icon: <FiMessageCircle /> },
    { name: "Configuração", icon: <FiSettings /> },
    { name: "Você", icon: <FiUser /> },
  ];

  // 🖼️ Tutoriais com imagens voltadas para "informação/educação"
  const tutorials = [
    { title: "Como organizar seus estudos", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
    { title: "Aprenda a usar planilhas no dia a dia", img: "https://images.unsplash.com/photo-1581090700227-4c4f50b1d6c5" },
    { title: "Dicas rápidas de produtividade", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
    { title: "Guia básico de finanças pessoais", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f" },
    { title: "Aprenda a escrever melhor", img: "https://images.unsplash.com/photo-1509057199576-632a47484ece" },
    { title: "Como pesquisar com eficiência", img: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02" },
  ];

  // 🎨 Nova paleta de cores (Tema Informação)
  const mainColor = "#1E293B";   // Azul grafite (header/sidebar)
  const accentColor = "#38BDF8"; // Azul claro (educação, clareza)
  const bgLight = "#F1F5F9";     // Fundo claro
  const textColor = "#111827";   // Texto cinza escuro

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bgLight, color: textColor }}>
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "#fff" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl text-white">MDV</span>}
          <button onClick={toggleMenu} className="text-white hover:opacity-80 transition">
            <FiMenu size={24} />
          </button>
        </div>

        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="flex justify-end items-center p-4 shadow-md border-b"
          style={{ backgroundColor: mainColor, borderColor: "#334155" }}
        >
          <div className="flex space-x-2">
            <button
              onClick={goRegister}
              className="px-4 py-2 rounded font-semibold hover:brightness-110 transition"
              style={{ backgroundColor: accentColor, color: "#fff" }}
            >
              Registre-se
            </button>
            <button
              onClick={goLogin}
              className="px-4 py-2 rounded font-semibold hover:brightness-110 transition"
              style={{ backgroundColor: accentColor, color: "#fff" }}
            >
              Login
            </button>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: mainColor }}>
            Tutoriais Recomendados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tut, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: "#fff" }}
              >
                <img
                  src={tut.img}
                  alt={tut.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg" style={{ color: mainColor }}>
                    {tut.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
